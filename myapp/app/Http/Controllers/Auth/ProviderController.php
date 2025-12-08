<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProviderController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        // Get user info from Google
        $googleUser = Socialite::driver($provider)->user();

        // Try to find existing user by email
        $user = User::where('email', $googleUser->getEmail())->first();

        // Create a new user if not found
        if (!$user) {
            $user = User::create([
                'name'     => $googleUser->getName(),
                'email'    => $googleUser->getEmail(),
                'password' => bcrypt(Str::random(16)),
            ]);
        }

        // Log the user into Laravel
        Auth::login($user);

        // Redirect to dashboard
        return redirect('/dashboard');
    }
}
