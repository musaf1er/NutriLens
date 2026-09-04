<?php

namespace App\Http\Controllers;

use App\Models\FoodHistory;
use Illuminate\Support\Facades\Auth;

class HistoryController extends Controller
{
    public function index() { return view('history', ['histories' => Auth::user()->foodHistories()->with('food')->latest()->paginate(10)]); }
    public function destroy(FoodHistory $history)
    {
        abort_unless($history->user_id === Auth::id(), 403);
        $history->delete();
        return back()->with('success', 'History record deleted.');
    }
}