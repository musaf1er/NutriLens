<?php

namespace App\Http\Controllers;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $histories = Auth::user()->foodHistories()->with('food')->latest()->get();
        return view('dashboard', ['histories' => $histories->take(5), 'foodCount' => $histories->count(), 'todayCalories' => $histories->filter(fn ($item) => $item->created_at->isToday())->sum('total_calories')]);
    }
}