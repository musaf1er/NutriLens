<?php

namespace App\Http\Controllers;

use App\Models\Food;
use App\Models\FoodHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FoodAnalysisController extends Controller
{
    public function create() { return view('analyze'); }

    public function predict(Request $request)
    {
        $validated = $request->validate(['image' => ['required', 'image', 'mimes:jpg,jpeg,png', 'max:5120']]);
        $image = $validated['image'];
        try {
            $response = Http::timeout(30)->attach('image', fopen($image->getRealPath(), 'r'), $image->getClientOriginalName())->post(rtrim(config('services.ai.url'), '/') . '/predict');
        } catch (\Throwable) {
            return back()->withErrors(['image' => 'Food analysis service is currently unavailable.']);
        }
        if (! $response->successful() || ! $response->json('success')) {
            return back()->withErrors(['image' => $response->json('message', $response->json('detail', 'Unable to identify the food.'))]);
        }
        $food = Food::where('food101_label', $response->json('prediction'))->first();
        if (! $food) return back()->withErrors(['image' => 'Nutrition information for this food is not available.']);
        $path = $image->store('food-images', 'public');
        return view('analyze', ['food' => $food, 'confidence' => (float) $response->json('confidence'), 'imagePath' => $path]);
    }

    public function save(Request $request)
    {
        $data = $request->validate(['food_id' => ['required', 'exists:foods,id'], 'confidence' => ['required', 'numeric', 'between:0,1'], 'portion_gram' => ['required', 'numeric', 'gt:0'], 'image_path' => ['nullable', 'string']]);
        $food = Food::findOrFail($data['food_id']);
        $data['total_calories'] = round($food->calories_per_100g * $data['portion_gram'] / 100, 2);
        auth()->user()->foodHistories()->create($data);
        return redirect()->route('history')->with('success', 'Food analysis saved to history.');
    }
}