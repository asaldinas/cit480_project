<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\CalendarEventController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TodoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/blade-page', function () {
        return view('app');
    })->name('blade.page');

    Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics');

    Route::post('/applications', [ApplicationController::class, 'store'])->name('applications.store');
    Route::put('/applications/{application}', [ApplicationController::class, 'update'])->name('applications.update');
    Route::delete('/applications/{application}', [ApplicationController::class, 'destroy'])->name('applications.destroy');

    Route::post('/todos', [TodoController::class, 'store'])->name('todos.store');
    Route::put('/todos/{todo}', [TodoController::class, 'update'])->name('todos.update');
    Route::patch('/todos/{todo}/complete', [TodoController::class, 'complete'])->name('todos.complete');
    Route::delete('/todos/{todo}', [TodoController::class, 'destroy'])->name('todos.destroy');

    Route::get('/documents', [DocumentController::class, 'index'])->name('documents.index');
    Route::post('/documents', [DocumentController::class, 'store'])->name('documents.store');
    Route::get('/documents/{document}/view', [DocumentController::class, 'view'])->name('documents.view');
    Route::get('/documents/{document}/download', [DocumentController::class, 'download'])->name('documents.download');
    Route::delete('/documents/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');

    Route::get('/contacts', [ContactController::class, 'index'])->name('contacts.index');
    Route::post('/contacts', [ContactController::class, 'store'])->name('contacts.store');
    Route::put('/contacts/{contact}', [ContactController::class, 'update'])->name('contacts.update');
    Route::delete('/contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');

    Route::get('/calendar', [CalendarEventController::class, 'index'])->name('calendar.index');
    Route::post('/calendar/events', [CalendarEventController::class, 'store'])->name('calendar.events.store');
    Route::put('/calendar/events/{calendarEvent}', [CalendarEventController::class, 'update'])->name('calendar.events.update');
    Route::delete('/calendar/events/{calendarEvent}', [CalendarEventController::class, 'destroy'])->name('calendar.events.destroy');

    Route::get('/settings', [SettingsController::class, 'index'])->name('settings');
    Route::put('/settings/profile', [SettingsController::class, 'updateProfile'])->name('settings.profile.update');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/sign-out', fn () => Inertia::render('SignOut'))->name('signout');
    Route::get('/privacy', fn () => Inertia::render('Privacy'))->name('privacy');
});

Route::get('/search', [SearchController::class, 'search'])->name('search');

require __DIR__.'/auth.php';