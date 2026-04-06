<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use App\Models\Notification;

class ApplicationController extends Controller
{
public function store(Request $request)
{
    $data = $request->validate([
        'company'  => 'required|string|max:255',
        'position' => 'required|string|max:255',
        'salary'   => 'nullable|string|max:255',
        'status'   => 'required|string|in:todo,submitted,response',
        'location' => 'nullable|string|max:255',
        'source'   => 'nullable|string|in:LinkedIn,Indeed,Company site,Referral,Other',
        'notes'    => 'nullable|string',
    ]);

    $data['user_id'] = $request->user()->id;

    Application::create($data);

    Notification::create([
    'user_id'        => auth()->id(),
    'type'           => 'followup_reminder',
    'title'          => 'Follow Up Reminder',
    'message'        => "It's been a month since you applied to {$application->company}. Consider following up!",
    'application_id' => $application->id,
    'scheduled_at'   => now()->addMonth(),
]);

    return redirect()->route('dashboard')->with('success', 'Job created.');
}


   public function update(Request $request, Application $application)
{
    $data = $request->validate([
        'company'  => 'required|string|max:255',
        'position' => 'required|string|max:255',
        'salary'   => 'nullable|string|max:255',
        'status'   => 'required|string|in:todo,submitted,response',
        'location' => 'nullable|string|max:255',
        'source'   => 'nullable|string|in:LinkedIn,Indeed,Company site,Referral,Other',
        'notes'    => 'nullable|string',
    ]);

    $application->update($data);

    return redirect()->route('dashboard')->with('success', 'Job updated.');
}


    public function destroy(Request $request, Application $application)
    {
    

        $application->delete();

        return redirect()->route('dashboard')->with('success', 'Job deleted.');
    }
}
