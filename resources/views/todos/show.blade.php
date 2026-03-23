@extends('layouts.app')

@section('title', 'Todo Details')

@section('content')
    <div class="mb-3">
        <h5>{{ $todo->title }}</h5>
        <div class="form-check">
            <input type="checkbox"
                   class="form-check-input todo-status"
                   data-todo-id="{{ $todo->id }}"
                   {{ $todo->completed ? 'checked' : '' }}>
            <label class="form-check-label {{ $todo->completed ? 'text-decoration-line-through' : '' }}">
                {{ $todo->completed ? 'Completed' : 'Pending' }}
            </label>
        </div>
    </div>

    @if($todo->description)
        <div class="mb-3">
            <label class="form-label">Description:</label>
            <p class="border p-2 rounded">{{ $todo->description }}</p>
        </div>
    @endif

    <div class="mb-3">
        <label class="form-label">Created:</label>
        <p>{{ $todo->created_at->format('M d, Y h:i A') }}</p>
    </div>

    <div class="mb-3">
        <label class="form-label">Last Updated:</label>
        <p>{{ $todo->updated_at->format('M d, Y h:i A') }}</p>
    </div>

    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <a href="{{ route('todos.index') }}" class="btn btn-secondary me-md-2">
            <i class="fas fa-arrow-left"></i> Back to List
        </a>
        <a href="{{ route('todos.edit', $todo->id) }}" class="btn btn-warning me-md-2">
            <i class="fas fa-edit"></i> Edit
        </a>
        <form action="{{ route('todos.destroy', $todo->id) }}" method="POST" class="d-inline">
            @csrf
            @method('DELETE')
            <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure?')">
                <i class="fas fa-trash"></i> Delete
            </button>
        </form>
    </div>
@endsection

@push('scripts')
<script>
$(document).ready(function() {
    $('.todo-status').change(function() {
        const todoId = $(this).data('todo-id');
        const completed = $(this).is(':checked') ? 1 : 0;

        $.ajax({
            url: "{{ route('todos.updateStatus', 'todo') }}/" + todoId,
            type: 'PUT',
            data: {
                completed: completed,
                _token: "{{ csrf_token() }}"
            },
            success: function(response) {
                location.reload();
            },
            error: function(xhr) {
                alert('Error updating status');
            }
        });
    });
});
</script>
@endpush