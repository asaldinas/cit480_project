<?php

namespace App\Http\Controllers;

use App\Models\CalendarEvent;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarEventController extends Controller
{
    public function index(Request $request)
    {
        $events = CalendarEvent::where('user_id', $request->user()->id)
            ->orderBy('event_date')
            ->orderBy('event_time')
            ->get()
            ->groupBy(function ($event) {
                return Carbon::parse($event->event_date)->format('Y-m-d');
            })
            ->map(function ($items) {
                return $items->map(function ($event) {
                    return [
                        'id' => $event->id,
                        'type' => $event->type,
                        'label' => $event->label,
                        'event_time' => $event->event_time
                            ? substr((string) $event->event_time, 0, 5)
                            : null,
                    ];
                })->values()->all();
            })
            ->toArray();

        return Inertia::render('Calendar', [
            'events' => $events,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'event_date' => ['required', 'date'],
            'event_time' => ['nullable', 'date_format:H:i'],
            'type' => ['required', 'in:interview,deadline,followup,networking'],
            'label' => ['required', 'string', 'max:255'],
        ]);

        CalendarEvent::create([
            'user_id' => $request->user()->id,
            'event_date' => $validated['event_date'],
            'event_time' => $validated['event_time'] ?? null,
            'type' => $validated['type'],
            'label' => $validated['label'],
        ]);

        return redirect()->route('calendar.index');
    }

    public function update(Request $request, CalendarEvent $calendarEvent)
    {
        if ($calendarEvent->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'event_time' => ['nullable', 'date_format:H:i'],
            'type' => ['required', 'in:interview,deadline,followup,networking'],
            'label' => ['required', 'string', 'max:255'],
        ]);

        $calendarEvent->update([
            'event_time' => $validated['event_time'] ?? null,
            'type' => $validated['type'],
            'label' => $validated['label'],
        ]);

        return redirect()->route('calendar.index');
    }

    public function destroy(Request $request, CalendarEvent $calendarEvent)
    {
        if ($calendarEvent->user_id !== $request->user()->id) {
            abort(403);
        }

        $calendarEvent->delete();

        return redirect()->route('calendar.index');
    }
}