<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    public function search(Request $request): Response
    {
        $query = $request->input('q', '');

        $results = [];

        if (! empty($query)) {
            $results = DB::table('applications')
                ->where('company_name', 'like', "%{$query}%")
                ->orWhere('job_title', 'like', "%{$query}%")
                ->orWhere('status', 'like', "%{$query}%")
                ->limit(20)
                ->get();
        }

        return Inertia::render('SearchResults', [
            'query' => $query,
            'results' => $results,
        ]);
    }
}