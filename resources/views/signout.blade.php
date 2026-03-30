<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Out</title>
    <style>
        body {
            font-family: sans-serif;
            background-color: #f0f0f0;
            padding: 40px;
            text-align: center;
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        p {
            font-size: 1.1rem;
            color: #555;
        }
        a {
            display: inline-block;
            margin-top: 20px;
            text-decoration: none;
            color: #007bff;
        }
    </style>
</head>
<body>
    <h1>Sign Out</h1>
    <p>This is a placeholder sign-out page. Later you can hook this to real auth logic.</p>

    <a href="{{ route('dashboard') }}">Back to dashboard</a>
</body>
</html>
