<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AnalyticsController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Authenticated + Verified Routes
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');
    Route::get('/blade-page', function () {
    return view('app');
    });

    // Application CRUD
    Route::post('/applications', [ApplicationController::class, 'store'])
        ->name('applications.store');

    Route::put('/applications/{application}', [ApplicationController::class, 'update'])
        ->name('applications.update');

    Route::delete('/applications/{application}', [ApplicationController::class, 'destroy'])
        ->name('applications.destroy');
});

//Analytics routes
Route::get('/Analytics', [AnalyticsController::class, 'index'])->name('analytics');

// Profile routes
Route::middleware('auth')->group(function () {

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // NEW: React Settings page
    Route::get('/settings', function () {
        return Inertia::render('Settings');
    })->name('settings');

    // NEW: React Sign Out placeholder page
    Route::get('/sign-out', function () {
        return Inertia::render('SignOut');
    })->name('signout');
});


require __DIR__.'/auth.php';
