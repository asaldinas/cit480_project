<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DocumentController;
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


// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    // Applications
    Route::post('/applications', [ApplicationController::class, 'store'])
        ->name('applications.store');

    Route::put('/applications/{application}', [ApplicationController::class, 'update'])
        ->name('applications.update');

    Route::delete('/applications/{application}', [ApplicationController::class, 'destroy'])
        ->name('applications.destroy');

    // Documents
    Route::get('/documents', [DocumentController::class, 'index'])
        ->name('documents.index');

    Route::post('/documents', [DocumentController::class, 'store'])
        ->name('documents.store');

    // Analytics
    Route::get('/analytics', [AnalyticsController::class, 'index'])
        ->name('analytics');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Settings
    Route::get('/settings', fn () => Inertia::render('Settings'))->name('settings');
    Route::get('/sign-out', fn () => Inertia::render('SignOut'))->name('signout');
    Route::get('/calendar', fn () => Inertia::render('Calendar'))->name('calendar');
    Route::get('/contacts', fn () => Inertia::render('Contacts'))->name('contacts');
    Route::get('/privacy', fn () => Inertia::render('Privacy'))->name('privacy');
});
require __DIR__.'/auth.php';
