<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Application;
use App\Models\Todo;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $search = $request->get('search', '');

        $query = Application::where('user_id', $user->id)
            ->when($search, fn($q) => $q->where(function ($q) use ($search) {
                $q->where('company', 'like', "%{$search}%")
                  ->orWhere('position', 'like', "%{$search}%");
            }));

        return Inertia::render('Dashboard', [
            'auth'          => ['user' => $user],
            'search'        => $search,
            'todoJobs'      => (clone $query)->where('status', 'todo')->get(),
            'submittedJobs' => (clone $query)->where('status', 'submitted')->get(),
            'responseJobs'  => (clone $query)->where('status', 'response')->get(),
            'todos'         => Todo::with('application:id,company,position,link')
                ->where('user_id', $user->id)
                ->latest()
                ->get(),
            'pickableApps'  => Application::where('user_id', $user->id)
                ->where('status', 'submitted')
                ->orderBy('company')
                ->get(['id', 'company', 'position', 'salary', 'location', 'source', 'link']),
        ]);
    }
}
