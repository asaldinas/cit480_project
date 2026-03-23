<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\ContactController;


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

    Route::get('/documents/{document}/view', [DocumentController::class, 'view'])
    ->name('documents.view')
    ->middleware(['auth', 'verified']);

    Route::get('/documents/{document}/download', [DocumentController::class, 'download'])
    ->name('documents.download')
    ->middleware(['auth', 'verified']);

    Route::delete('/documents/{document}', [DocumentController::class, 'destroy'])
    ->name('documents.destroy')
    ->middleware(['auth', 'verified']);
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

   // Contacts
    Route::get('/contacts', [ContactController::class, 'index'])->name('contacts');
Route::post('/contacts', [ContactController::class, 'store'])->name('contacts.store');
Route::put('/contacts/{contact}', [ContactController::class, 'update'])->name('contacts.update');
Route::delete('/contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');
    Route::get('/privacy', fn () => Inertia::render('Privacy'))->name('privacy');
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

//Anti-SQL Injection
Route::get('/search', 'SearchController@search');

require __DIR__.'/auth.php';
