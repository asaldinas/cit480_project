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

        // If not authenticated, return safe defaults
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
                    'statuses' => [],
                ],
            ]);
        }

        // Base query for this user's applications
        $baseQuery = Application::query()->where('user_id', $user->id);

        // ---- Total applications ----
        $totalApplications = (int) (clone $baseQuery)->count();

        // ---- Weekly total ----
        $startOfWeek = Carbon::now()->startOfWeek();
        $totalThisWeek = (int) (clone $baseQuery)
            ->where('created_at', '>=', $startOfWeek)
            ->count();

        // ---- Response rate (overall) ----
        // Adjust this if your DB uses a different value (e.g. 'responded', 'Response', etc.)
        $responseStatus = 'response';

        $totalResponses = (int) (clone $baseQuery)
            ->where('status', $responseStatus)
            ->count();

        $responseRate = $totalApplications > 0
            ? ($totalResponses / $totalApplications) * 100
            : 0;

        // ---- Response rate delta (this month vs last month) ----
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

        // ---- Status distribution for donut chart ----
        // Get counts grouped by status: ['submitted' => 15, 'response' => 6, ...]
        $countsByStatus = (clone $baseQuery)
            ->selectRaw('status, COUNT(*) as cnt')
            ->groupBy('status')
            ->pluck('cnt', 'status')
            ->toArray();

        // Map DB status values -> labels + colors (EDIT THESE KEYS)
        $statusMap = [
            // 'db_status_value' => ['label' => 'UI label', 'color' => '#HEX']
            'todo'      => ['label' => 'To Do List', 'color' => '#94a3b8'], // slate-400
            'submitted' => ['label' => 'Submitted',  'color' => '#14b8a6'], // teal-500
            'response'  => ['label' => 'Responses',  'color' => '#3b82f6'], // blue-500
            'rejected'  => ['label' => 'Rejections', 'color' => '#ef4444'], // red-500
        ];

        $statuses = [];

        // Add mapped statuses first (consistent ordering)
        foreach ($statusMap as $key => $meta) {
            $val = isset($countsByStatus[$key]) ? (int) $countsByStatus[$key] : 0;

            $statuses[] = [
                'key' => $key,
                'label' => $meta['label'],
                'value' => $val,
                'color' => $meta['color'],
            ];
        }

        // Append any statuses in DB that aren't in the map (so you don't “lose” data)
        foreach ($countsByStatus as $key => $cnt) {
            if (!array_key_exists($key, $statusMap)) {
                $statuses[] = [
                    'key' => $key,
                    'label' => ucfirst((string) $key),
                    'value' => (int) $cnt,
                    'color' => '#9ca3af', // fallback gray
                ];
            }
        }

        // If you prefer totalApplications to be the DB count (not sum of mapped statuses),
        // keep $totalApplications as computed above (recommended).
        return Inertia::render('Analytics', [
            'kpis' => [
                'totalApplications' => $totalApplications,
                'totalThisWeek' => $totalThisWeek,
                'responseRate' => $responseRate,
                'responseRateDelta' => $responseRateDelta,

                // placeholders (compute later if you add responded_at, interview status, etc.)
                'avgResponseTimeDays' => 0,
                'medianResponseTimeDays' => 0,
                'interviewRate' => 0,
                'interviewsSecured' => 0,

                // donut chart data
                'statuses' => $statuses,
            ],
        ]);
    }
}