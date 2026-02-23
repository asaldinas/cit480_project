<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Application;
use Carbon\Carbon;

class AnalyticsController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return Inertia::render('Analytics', [
                'kpis' => [
                    'totalApplications' => 0,
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

        $baseQuery = Application::query()->where('user_id', $user->id);

        $totalApplications = (int) $baseQuery->count();

        // IMPORTANT: adjust this if your DB uses a different status value
        $responseStatus = 'response';

        $totalResponses = (int) (clone $baseQuery)
            ->where('status', $responseStatus)
            ->count();

        $responseRate = $totalApplications > 0
            ? ($totalResponses / $totalApplications) * 100
            : 0;

        // Weekly applications (optional KPI you already show)
        $startOfWeek = Carbon::now()->startOfWeek(); // locale dependent; adjust if you want Monday always
        $totalThisWeek = (int) (clone $baseQuery)
            ->where('created_at', '>=', $startOfWeek)
            ->count();

        // Month-over-month delta for response rate
        $startThisMonth = Carbon::now()->startOfMonth();
        $startLastMonth = (clone $startThisMonth)->subMonth();
        $endLastMonth = (clone $startThisMonth)->subSecond();

        $thisMonthTotal = (int) (clone $baseQuery)
            ->whereBetween('created_at', [$startThisMonth, Carbon::now()])
            ->count();

        $thisMonthResponses = (int) (clone $baseQuery)
            ->whereBetween('created_at', [$startThisMonth, Carbon::now()])
            ->where('status', $responseStatus)
            ->count();

        $lastMonthTotal = (int) (clone $baseQuery)
            ->whereBetween('created_at', [$startLastMonth, $endLastMonth])
            ->count();

        $lastMonthResponses = (int) (clone $baseQuery)
            ->whereBetween('created_at', [$startLastMonth, $endLastMonth])
            ->where('status', $responseStatus)
            ->count();

        $thisMonthRate = $thisMonthTotal > 0 ? ($thisMonthResponses / $thisMonthTotal) * 100 : 0;
        $lastMonthRate = $lastMonthTotal > 0 ? ($lastMonthResponses / $lastMonthTotal) * 100 : 0;

        $responseRateDelta = $thisMonthRate - $lastMonthRate;

        return Inertia::render('Analytics', [
            'kpis' => [
                'totalApplications' => $totalApplications,
                'totalThisWeek' => $totalThisWeek,
                'responseRate' => $responseRate,
                'responseRateDelta' => $responseRateDelta,

                // keep your placeholders for now
                'avgResponseTimeDays' => 0,
                'medianResponseTimeDays' => 0,
                'interviewRate' => 0,
                'interviewsSecured' => 0,
            ],
        ]);
    }
}