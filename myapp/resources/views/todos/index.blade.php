<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todos</title>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
    <h1>Todos</h1>

    @if(session('success'))
        <div style="color: green;">{{ session('success') }}</div>
    @endif

    <a href="{{ route('todos.create') }}"><button type="button" class="btn-outline-primary btn-large">Create New Todo</button></a>

    <ul>
        @foreach($todos as $todo)
            <li>
                <input type="checkbox"
                       {{ $todo->completed ? 'checked' : '' }}
                       onchange="toggleTodo({{ $todo->id }})">
                {{ $todo->title }}
                <a href="{{ route('todos.show', $todo) }}"><button type="button" class="btn-outline-primary btn-large">View</button></a>
                <a href="{{ route('todos.edit', $todo) }}"><button type="button" class="btn-outline-primary btn-large">Edit</button></a>
                <form action="{{ route('todos.destroy', $todo) }}" method="POST" style="display: inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-primary">Delete</button>
                </form>
            </li>
        @endforeach
    </ul>

    <script>
        function toggleTodo(todoId) {
            axios.patch(`/todos/${todoId}/toggle`)
                .then(response => {
                    console.log('Todo toggled');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    </script>
</body>
</html>