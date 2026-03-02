<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DocumentController extends Controller
{
    /**
     * Display user's documents
     */
    public function index()
    {
        $documents = Document::where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Documents', [
            'documents' => $documents
        ]);
    }

    /**
     * Store uploaded document
     */
    public function store(Request $request)
{
    $request->validate([
        'file' => [
            'required',
            'file',
            'max:5120',
            'mimes:pdf,doc,docx,jpg,jpeg,png'
        ],
        'category' => 'required|in:resume,cover_letter,portfolio,certificate',
        'tags' => 'nullable|array'
    ]);

    $file = $request->file('file');

    $uuid = Str::uuid()->toString();
    $extension = $file->getClientOriginalExtension();

    $directory = "documents/" . auth()->id();
    $filename = $uuid . "." . $extension;

    Storage::disk('s3')->putFileAs($directory, $file, $filename);

    $path = $directory . "/" . $filename;

    Document::create([
        'user_id' => auth()->id(),
        'original_name' => $file->getClientOriginalName(),
        's3_path' => $path,
        'category' => $request->category,
        'tags' => $request->tags,
        'mime_type' => $file->getMimeType(),
        'size' => $file->getSize(),
    ]);

    return redirect()->back();
}
}