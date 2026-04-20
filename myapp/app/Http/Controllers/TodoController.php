<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todos = Todo::orderBy('created_at', 'desc')->get();
        return view('todos.index', compact('todos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('todos.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'application_id' => [
                'nullable',
                Rule::exists('applications', 'id')->where(fn ($query) => $query
                    ->where('user_id', $request->user()->id)
                    ->where('status', 'submitted')),
            ],
            'type' => 'nullable|string|in:follow_up,apply,send_email,custom',
            'input_type' => 'sometimes|string|in:text,link,action',
            'value' => 'nullable|string|max:2048',
        ]);

        $validated['user_id'] = $request->user()->id;
        $validated['input_type'] = $validated['input_type'] ?? 'action';
        $validated['value'] = $validated['value'] ?? null;
        $validated['completed'] = false;

        Todo::create($validated);

        return redirect()->route('dashboard')->with('success', 'Todo created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        return view('todos.show', compact('todo'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        return view('todos.edit', compact('todo'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        abort_unless($todo->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'application_id' => [
                'nullable',
                Rule::exists('applications', 'id')->where(fn ($query) => $query
                    ->where('user_id', $request->user()->id)
                    ->where('status', 'submitted')),
            ],
            'type' => 'nullable|string|in:follow_up,apply,send_email,custom',
        ]);

        $todo->update($validated);

        return redirect()->route('dashboard')->with('success', 'Todo updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Todo $todo)
    {
        abort_unless($todo->user_id === $request->user()->id, 403);

        $todo->delete();

        return redirect()->route('dashboard')->with('success', 'Todo deleted successfully!');
    }

    /**
     * Update the status of the specified resource.
     */
    public function updateStatus(Request $request, Todo $todo)
    {
        abort_unless($todo->user_id === $request->user()->id, 403);

        $request->validate([
            'completed' => 'required|boolean'
        ]);

        $todo->update([
            'completed' => $request->completed,
            'completed_at' => $request->boolean('completed') ? now() : null,
        ]);

        return response()->json(['success' => 'Todo status updated successfully.']);
    }

    /**
     * Toggle todo completion status
     */
    public function toggle(Todo $todo)
    {
        abort_unless($todo->user_id === auth()->id(), 403);

        $completed = !$todo->completed;

        $todo->update([
            'completed' => $completed,
            'completed_at' => $completed ? now() : null,
        ]);

        return response()->json([
            'success' => true,
            'completed' => $todo->completed
        ]);
    }

    public function complete(Request $request, Todo $todo)
    {
        abort_unless($todo->user_id === $request->user()->id, 403);

        $todo->update([
            'completed' => true,
            'completed_at' => now(),
        ]);

        return redirect()->route('dashboard')->with('success', 'Todo completed.');
    }
}
