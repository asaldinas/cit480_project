<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        // Base query: only this user's applications
        $query = Application::where('user_id', auth()->id());

        // Search filter
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('company', 'like', "%{$search}%")
                  ->orWhere('position', 'like', "%{$search}%")
                  ->orWhere('salary', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhere('notes', 'like', "%{$search}%");
            });
        }

        $applications = $query->orderBy('created_at', 'desc')->get();

        // Group into your 3 dashboard columns
        $todoJobs      = $applications->where('status', 'todo')->values();
        $submittedJobs = $applications->where('status', 'submitted')->values();
        $responseJobs  = $applications->where('status', 'response')->values();

        return Inertia::render('Dashboard', [
            'search'        => $search,
            'todoJobs'      => $todoJobs,
            'submittedJobs' => $submittedJobs,
            'responseJobs'  => $responseJobs,
        ]);
    }
}
