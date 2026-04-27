<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return Inertia::render('Settings', [
            'auth' => [
                'user' => $user,
            ],
            'two_factor_enabled' => ! is_null($user?->two_factor_secret),
            'two_factor_confirmed' => ! is_null($user?->two_factor_confirmed_at),
        ]);
    }

    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'location' => ['nullable', 'string', 'max:100'],
            'linkedin_url' => ['nullable', 'string', 'max:255'],
            'portfolio_url' => ['nullable', 'string', 'max:255'],
        ]);

        $request->user()->update($validated);

        return back()->with('success', 'Profile updated.');
    }
}