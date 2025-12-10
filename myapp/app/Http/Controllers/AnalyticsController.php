<?php
// app/Http/Controllers/AnalyticsController.php

namespace App\Http\Controllers;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ApplicationController;

class AnalyticsController extends Controller
{
    public function index()
    {
        return Inertia::render('Analytics', [
            // any props
        ]);
    }
}
