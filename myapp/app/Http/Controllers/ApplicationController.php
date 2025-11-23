<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'company'  => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'salary'   => 'nullable|string|max:255',
            'status'   => 'required|string|in:todo,submitted,response',
        ]);

        $data['user_id'] = $request->user()->id;

        Application::create($data);

        return redirect()->route('dashboard')->with('success', 'Job created.');
    }

    public function update(Request $request, Application $application)
    {
        $this->authorize('update', $application); // optional if you add policies

        $data = $request->validate([
            'company'  => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'salary'   => 'nullable|string|max:255',
            'status'   => 'required|string|in:todo,submitted,response',
        ]);

        $application->update($data);

        return redirect()->route('dashboard')->with('success', 'Job updated.');
    }

    public function destroy(Request $request, Application $application)
    {
        $this->authorize('delete', $application); // optional

        $application->delete();

        return redirect()->route('dashboard')->with('success', 'Job deleted.');
    }
}
