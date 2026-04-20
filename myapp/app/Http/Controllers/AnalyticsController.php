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
                'kpis'               => ['totalApplications' => 0, 'totalThisWeek' => 0, 'responseRate' => 0, 'responseRateDelta' => 0, 'interviewsSecured' => 0, 'acceptedCount' => 0, 'statuses' => []],
                'responseTypes'      => [],
                'monthlyActivity'    => [],
                'applicationSources' => [],
            ]);
        }

        // Base query excludes todo — only actual submitted/responded applications count
        $q = Application::query()->where('user_id', $user->id)->whereIn('status', ['submitted', 'response']);

        // ---- KPIs ----
        $totalApplications  = (int)(clone $q)->count();
        $totalThisWeek      = (int)(clone $q)->where('created_at', '>=', Carbon::now()->startOfWeek())->count();

        $totalResponses = (int)(clone $q)->where('status', 'response')->count();
        $responseRate   = $totalApplications > 0 ? ($totalResponses / $totalApplications) * 100 : 0;

        $interviewsSecured = (int)(clone $q)->where('response_type', 'interview')->count();
        $acceptedCount     = (int)(clone $q)->where('response_type', 'accepted')->count();

        // ---- Response rate delta (this month vs last month) ----
        $startThisMonth = Carbon::now()->startOfMonth();
        $startLastMonth = (clone $startThisMonth)->subMonth();
        $endLastMonth   = (clone $startThisMonth)->subSecond();

        $thisMonthSubmitted = (int)(clone $q)->whereBetween('created_at', [$startThisMonth, Carbon::now()])->count();
        $thisMonthResponses = (int)(clone $q)->whereBetween('created_at', [$startThisMonth, Carbon::now()])->where('status', 'response')->count();
        $lastMonthSubmitted = (int)(clone $q)->whereBetween('created_at', [$startLastMonth, $endLastMonth])->count();
        $lastMonthResponses = (int)(clone $q)->whereBetween('created_at', [$startLastMonth, $endLastMonth])->where('status', 'response')->count();

        $thisMonthRate     = $thisMonthSubmitted > 0 ? ($thisMonthResponses / $thisMonthSubmitted) * 100 : 0;
        $lastMonthRate     = $lastMonthSubmitted > 0 ? ($lastMonthResponses / $lastMonthSubmitted) * 100 : 0;
        $responseRateDelta = $thisMonthRate - $lastMonthRate;

        // ---- Status donut ----
        $countsByStatus = (clone $q)->selectRaw('status, COUNT(*) as cnt')->groupBy('status')->pluck('cnt', 'status')->toArray();

        $statusMap = [
            'submitted' => ['label' => 'Submitted', 'color' => '#14b8a6'],
            'response'  => ['label' => 'Responses', 'color' => '#3b82f6'],
        ];

        $statuses = [];
        foreach ($statusMap as $key => $meta) {
            $statuses[] = ['key' => $key, 'label' => $meta['label'], 'value' => (int)($countsByStatus[$key] ?? 0), 'color' => $meta['color']];
        }

        // ---- Response type breakdown ----
        $responseTypeCounts = (clone $q)->whereNotNull('response_type')->selectRaw('response_type, COUNT(*) as cnt')->groupBy('response_type')->pluck('cnt', 'response_type')->toArray();

        $responseTypeMap = [
            'interview'   => ['label' => 'Interview',   'color' => '#3b82f6'],
            'accepted'    => ['label' => 'Accepted',    'color' => '#22c55e'],
            'rejection'   => ['label' => 'Rejection',   'color' => '#ef4444'],
            'no_response' => ['label' => 'No Response', 'color' => '#94a3b8'],
        ];

        $responseTypes = [];
        foreach ($responseTypeMap as $key => $meta) {
            $responseTypes[] = ['key' => $key, 'label' => $meta['label'], 'value' => (int)($responseTypeCounts[$key] ?? 0), 'color' => $meta['color']];
        }

        // ---- Monthly activity (last 5 months) ----
        $start = Carbon::now()->subMonths(4)->startOfMonth();
        $end   = Carbon::now()->endOfMonth();

        $applicationsByMonth = (clone $q)->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as ym, COUNT(*) as cnt")->whereBetween('created_at', [$start, $end])->groupBy('ym')->pluck('cnt', 'ym')->toArray();
        $interviewsByMonth   = (clone $q)->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as ym, COUNT(*) as cnt")->whereBetween('created_at', [$start, $end])->where('response_type', 'interview')->groupBy('ym')->pluck('cnt', 'ym')->toArray();
        $responsesByMonth    = (clone $q)->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as ym, COUNT(*) as cnt")->whereBetween('created_at', [$start, $end])->where('status', 'response')->groupBy('ym')->pluck('cnt', 'ym')->toArray();

        $monthlyActivity = [];
        $cursor = $start->copy();
        while ($cursor->lte($end)) {
            $ym = $cursor->format('Y-m');
            $monthlyActivity[] = [
                'month'        => $cursor->format('M'),
                'ym'           => $ym,
                'applications' => (int)($applicationsByMonth[$ym] ?? 0),
                'interviews'   => (int)($interviewsByMonth[$ym] ?? 0),
                'responses'    => (int)($responsesByMonth[$ym] ?? 0),
            ];
            $cursor->addMonth();
        }

        // ---- Application sources ----
        $sourcesRaw = (clone $q)->selectRaw('source, COUNT(*) as cnt')->groupBy('source')->orderByDesc('cnt')->pluck('cnt', 'source')->toArray();

        $applicationSources = [];
        foreach ($sourcesRaw as $source => $cnt) {
            $applicationSources[] = ['label' => ($source && trim((string)$source) !== '') ? (string)$source : 'Other', 'value' => (int)$cnt];
        }

        return Inertia::render('Analytics', [
            'kpis' => [
                'totalApplications' => $totalApplications,
                'totalThisWeek'     => $totalThisWeek,
                'responseRate'      => $responseRate,
                'responseRateDelta' => $responseRateDelta,
                'interviewsSecured' => $interviewsSecured,
                'acceptedCount'     => $acceptedCount,
                'statuses'          => $statuses,
            ],
            'responseTypes'      => $responseTypes,
            'monthlyActivity'    => $monthlyActivity,
            'applicationSources' => $applicationSources,
        ]);
    }
}
