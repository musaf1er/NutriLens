<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FoodAnalysisController;
use App\Http\Controllers\HistoryController;

Route::get('/', fn () => redirect()->route('dashboard'));
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.store');
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('register.store');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/analyze', [FoodAnalysisController::class, 'create'])->name('analyze');
    Route::post('/analyze', [FoodAnalysisController::class, 'predict'])->name('analyze.predict');
    Route::post('/analyze/save', [FoodAnalysisController::class, 'save'])->name('analyze.save');
    Route::get('/history', [HistoryController::class, 'index'])->name('history');
    Route::delete('/history/{history}', [HistoryController::class, 'destroy'])->name('history.destroy');
});
