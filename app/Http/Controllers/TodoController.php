<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

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
            'description' => 'nullable|string'
        ]);

        Todo::create($validated);

        return redirect()->route('todos.index')->with('success', 'Todo created successfully!');
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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'sometimes|boolean'
        ]);

        $todo->update($validated);

        return redirect()->route('todos.index')->with('success', 'Todo updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();
        return redirect()->route('todos.index')->with('success', 'Todo deleted successfully!');
    }

    /**
     * Update the status of the specified resource.
     */
    public function updateStatus(Request $request, Todo $todo)
    {
        $request->validate([
            'completed' => 'required|boolean'
        ]);

        $todo->update([
            'completed' => $request->completed
        ]);

        return response()->json(['success' => 'Todo status updated successfully.']);
    }

    /**
     * Toggle todo completion status
     */
    public function toggle(Todo $todo)
    {
        $todo->update([
            'completed' => !$todo->completed
        ]);

        return response()->json([
            'success' => true,
            'completed' => $todo->completed
        ]);
    }
}