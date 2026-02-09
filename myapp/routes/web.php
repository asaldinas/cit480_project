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
// inside Route::middleware(['auth', 'verified'])->group(function () {
Route::get('/analytics', [AnalyticsController::class, 'index'])
    ->name('analytics');


// Profile routes
Route::middleware('auth')->group(function () {

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Settings page
    Route::get('/settings', function () {
        return Inertia::render('Settings');
    })->name('settings');

    // placeholder pages
    Route::get('/sign-out', function () {
        return Inertia::render('SignOut');
    })->name('signout');

     Route::get('/calendar', function () {
        return Inertia::render('Calendar');
    })->name('calendar');
    
    Route::get('/contacts', function () {
        return Inertia::render('Contacts');
    })->name('contacts');

    Route::get('/documents', function () {
        return Inertia::render('Documents');
    })->name('documents');

    Route::get('/privacy', function () {
        return Inertia::render('Privacy');
    })->name('privacy');
});



require __DIR__.'/auth.php';
