// app/Http/Controllers/SearchController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        // Validate user input
        $request->validate([
            'search_term' => 'required|string',
        ]);

        // Sanitize the input (optional, but recommended)
        $searchTerm = $request->input('search_term');

        // Use a parameterized query to prevent SQL injection
        $results = DB::select("SELECT * FROM your_table WHERE column_name = :searchTerm", ['searchTerm' => $searchTerm]);

        // Handle the search results
        // ...

        return view('search_results', ['results' => $results]);
    }
}
