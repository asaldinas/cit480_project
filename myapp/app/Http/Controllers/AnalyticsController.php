<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Application;

class AnalyticsController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $total = $user
            ? Application::where('user_id', $user->id)->count()
            : 0;

        return Inertia::render('Analytics', [
            'kpis' => [
                'totalApplications' => (int) $total,

                // Safe defaults so the React page doesn't crash
                'totalThisWeek' => 0,
                'responseRate' => 0,
                'responseRateDelta' => 0,
                'avgResponseTimeDays' => 0,
                'medianResponseTimeDays' => 0,
                'interviewRate' => 0,
                'interviewsSecured' => 0,
            ],
        ]);
    }
}
