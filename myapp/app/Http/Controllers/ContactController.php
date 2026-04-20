<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $query = Contact::where('user_id', auth()->id());

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%")
                  ->orWhere('position', 'like', "%{$search}%");
            });
        }

        $contacts = $query->latest()->get();

        return Inertia::render('Contacts', [
            'contacts' => $contacts,
            'search'   => $search ?? '',
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'nullable|email|max:255',
            'phone'    => 'nullable|string|max:50',
            'company'  => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'type'     => 'required|in:recruiter,hiring_manager,other',
            'notes'    => 'nullable|string',
        ]);

        Contact::create([
            'user_id'  => auth()->id(),
            ...$request->only(['name', 'email', 'phone', 'company', 'position', 'type', 'notes']),
        ]);

        return redirect()->route('contacts');
    }

    public function update(Request $request, Contact $contact)
    {
        abort_if($contact->user_id !== auth()->id(), 403);

        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'nullable|email|max:255',
            'phone'    => 'nullable|string|max:50',
            'company'  => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'type'     => 'required|in:recruiter,hiring_manager,other',
            'notes'    => 'nullable|string',
        ]);

        $contact->update($request->only(['name', 'email', 'phone', 'company', 'position', 'type', 'notes']));

        return redirect()->route('contacts');
    }

    public function destroy(Contact $contact)
    {
        abort_if($contact->user_id !== auth()->id(), 403);

        $contact->delete();

        return redirect()->route('contacts');
    }
}
