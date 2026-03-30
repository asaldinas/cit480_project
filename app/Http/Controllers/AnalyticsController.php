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

        // Safe defaults if not authenticated
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
                'monthlyActivity' => [],
                'applicationSources' => [],
            ]);
        }

        // Base query for this user's applications
        $baseQuery = Application::query()->where('user_id', $user->id);

        // ---- Status values (EDIT THESE TO MATCH YOUR DB) ----
        $responseStatus = 'response';
        $interviewStatus = 'interview';

        // ---- Total applications ----
        $totalApplications = (int) (clone $baseQuery)->count();

        // ---- Total this week ----
        $startOfWeek = Carbon::now()->startOfWeek();
        $totalThisWeek = (int) (clone $baseQuery)
            ->where('created_at', '>=', $startOfWeek)
            ->count();

        // ---- Response rate (overall) ----
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

        // ---- Donut chart: status distribution ----
        $countsByStatus = (clone $baseQuery)
            ->selectRaw('status, COUNT(*) as cnt')
            ->groupBy('status')
            ->pluck('cnt', 'status')
            ->toArray();

        // Map DB status values -> labels + colors (EDIT THESE KEYS)
        $statusMap = [
            'todo'      => ['label' => 'To Do List', 'color' => '#94a3b8'], // slate-400
            'submitted' => ['label' => 'Submitted',  'color' => '#14b8a6'], // teal-500
            'response'  => ['label' => 'Responses',  'color' => '#3b82f6'], // blue-500
            'rejected'  => ['label' => 'Rejections', 'color' => '#ef4444'], // red-500
        ];

        $statuses = [];

        // Add mapped statuses first (keeps ordering stable)
        foreach ($statusMap as $key => $meta) {
            $val = isset($countsByStatus[$key]) ? (int) $countsByStatus[$key] : 0;

            $statuses[] = [
                'key' => $key,
                'label' => $meta['label'],
                'value' => $val,
                'color' => $meta['color'],
            ];
        }

        // Append any unmapped statuses from DB (so you don’t hide data)
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

        // ---- Monthly activity graph (last 5 months) ----
        $monthsToShow = 5;

        $start = Carbon::now()->subMonths($monthsToShow - 1)->startOfMonth();
        $end = Carbon::now()->endOfMonth();

        $applicationsByMonth = (clone $baseQuery)
            ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as ym, COUNT(*) as cnt")
            ->whereBetween('created_at', [$start, $end])
            ->groupBy('ym')
            ->pluck('cnt', 'ym')
            ->toArray();

        $interviewsByMonth = (clone $baseQuery)
            ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as ym, COUNT(*) as cnt")
            ->whereBetween('created_at', [$start, $end])
            ->where('status', $interviewStatus)
            ->groupBy('ym')
            ->pluck('cnt', 'ym')
            ->toArray();

        $responsesByMonth = (clone $baseQuery)
            ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as ym, COUNT(*) as cnt")
            ->whereBetween('created_at', [$start, $end])
            ->where('status', $responseStatus)
            ->groupBy('ym')
            ->pluck('cnt', 'ym')
            ->toArray();

        $monthlyActivity = [];
        $cursor = $start->copy();

        while ($cursor->lte($end)) {
            $ym = $cursor->format('Y-m');

            $monthlyActivity[] = [
                'month' => $cursor->format('M'), // Jun, Jul, Aug...
                'ym' => $ym,                     // 2026-02
                'applications' => (int) ($applicationsByMonth[$ym] ?? 0),
               // 'interviews' => (int) ($interviewsByMonth[$ym] ?? 0),
                'responses' => (int) ($responsesByMonth[$ym] ?? 0),
            ];

            $cursor->addMonth();
        }

        // ---- Application sources (group by source) ----
// Change 'source' to the actual column name (e.g. 'application_source')
        $sourcesRaw = (clone $baseQuery)
            ->selectRaw('source, COUNT(*) as cnt')
            ->groupBy('source')
            ->orderByDesc('cnt')
            ->pluck('cnt', 'source')
            ->toArray();

// Normalize into an array for React: [{ label, value }]
        $applicationSources = [];
            foreach ($sourcesRaw as $source => $cnt) {
            $label = $source && trim((string)$source) !== '' ? (string)$source : 'Other';
            $applicationSources[] = [
            'label' => $label,
            'value' => (int)$cnt,
                ];
        }

        // ---- Return to Inertia ----
        return Inertia::render('Analytics', [
            'kpis' => [
                'totalApplications' => $totalApplications,
                'totalThisWeek' => $totalThisWeek,
                'responseRate' => $responseRate,
                'responseRateDelta' => $responseRateDelta,

                // placeholders 
                'avgResponseTimeDays' => 0,
                'medianResponseTimeDays' => 0,
                'interviewRate' => 0,
                'interviewsSecured' => 0,

                'statuses' => $statuses,
            ],
            'monthlyActivity' => $monthlyActivity,
            'applicationSources' => $applicationSources,
        ]);
    }
}