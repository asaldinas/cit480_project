<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DocumentController extends Controller
{

/** View the Doxument */
public function view(Document $document)
{
    abort_if($document->user_id !== auth()->id(), 403);

    $url = Storage::disk('s3')->temporaryUrl(
        $document->s3_path,
        now()->addMinutes(5)
    );

    return redirect($url);
}
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
     * Download Documents
     */
public function download(Document $document)
{
    abort_if($document->user_id !== auth()->id(), 403);

    $url = Storage::disk('s3')->temporaryUrl(
        $document->s3_path,
        now()->addMinutes(5),
        [
            'ResponseContentDisposition' =>
                'attachment; filename="'.$document->original_name.'"'
        ]
    );

    return redirect($url);
}
/**
 * Delete Document
 */
public function destroy(Document $document)
{
    abort_if($document->user_id !== auth()->id(), 403);

    // Delete from S3
    Storage::disk('s3')->delete($document->s3_path);

    // Soft delete DB record
    $document->delete();

    return redirect()->route('documents.index');
}

/**
 * 
 * Store uploaded document
 */
public function store(Request $request)
{

// Max 15 active documents
$documentCount = Document::where('user_id', auth()->id())->count();

if ($documentCount >= 15) {
    return back()->withErrors([
        'file' => 'You have reached the maximum limit of 15 documents.'
    ]);
}
    $request->validate([
            'file' => [
            'required',
            'file',
            'max:5120',
            'mimes:pdf,doc,docx,jpg,jpeg,png',
            'clamav'
        ],
        'category' => 'required|in:resume,cover_letter,certificate,other',
        'tags' => 'nullable|array'
    ]);

    $file = $request->file('file');

    $uuid = Str::uuid()->toString();
    $extension = $file->getClientOriginalExtension();

    $directory = "documents/" . auth()->id();
    $filename = $uuid . "." . $extension;

    Storage::disk('s3')->putFileAs($directory, $file, $filename);

    $path = $directory . "/" . $filename;


$document = new Document();
$document->user_id = auth()->id();
$document->original_name = $file->getClientOriginalName();
$document->s3_path = $path;
$document->category = $request->category;
$document->tags = $request->tags;
$document->mime_type = $file->getMimeType();
$document->size = $file->getSize();
$document->save();

    return redirect()->route('documents.index');
}
}