import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import DashboardSidebar from '@/Components/DashboardSidebar';
import TopBar from '@/Components/TopBar';

export default function Calendar() {
  const today = new Date();
  const minDate = new Date(2000, 0, 1);

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(today);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newEventType, setNewEventType] = useState('interview');
  const [newEventTitle, setNewEventTitle] = useState('');

  const [editingEvent, setEditingEvent] = useState(null);
  const [editEventType, setEditEventType] = useState('interview');
  const [editEventTitle, setEditEventTitle] = useState('');

  const [events, setEvents] = useState({
    '2025-10-08': [{ id: 1, type: 'interview', label: 'Tech Interview' }],
    '2025-10-14': [{ id: 2, type: 'deadline', label: 'City Deadline' }],
    '2025-10-21': [{ id: 3, type: 'followup', label: 'Recruiter Follow-up' }],
    '2025-10-25': [{ id: 4, type: 'networking', label: 'Networking Event' }],
  });

  const [nextId, setNextId] = useState(5);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const eventStyles = {
    interview: 'bg-teal-100 text-teal-700',
    deadline: 'bg-red-100 text-red-700',
    followup: 'bg-blue-100 text-blue-700',
    networking: 'bg-purple-100 text-purple-700',
  };

  const eventTypeLabels = {
    interview: 'Interview',
    deadline: 'Deadline',
    followup: 'Follow-up',
    networking: 'Networking',
  };

  const monthLabel = useMemo(() => {
    return currentDate.toLocaleString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }, [currentDate]);

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(day);
    }

    while (cells.length % 7 !== 0) {
      cells.push(null);
    }

    return cells;
  }, [currentDate]);

  const formatDateKey = (year, month, day) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const getDateKeyFromDate = (date) => {
    return formatDateKey(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const getEventsForDay = (day) => {
    if (!day) return [];
    const key = formatDateKey(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return events[key] || [];
  };

  const goToPreviousMonth = () => {
    const previous = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );

    if (previous >= minDate) {
      setCurrentDate(previous);
    }
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const isToday = (day) => {
    if (!day) return false;

    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelectedDay = (day) => {
    if (!day) return false;

    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const selectDay = (day) => {
    if (!day) return;
    setSelectedDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    );
  };

  const addEvent = () => {
    const title = newEventTitle.trim();
    if (!title) return;

    const key = getDateKeyFromDate(selectedDate);

    const newItem = {
      id: nextId,
      type: newEventType,
      label: title,
    };

    setEvents((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newItem],
    }));

    setNextId((prev) => prev + 1);
    setNewEventTitle('');
    setNewEventType('interview');
    setShowAddModal(false);
    setCurrentDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
    );
  };

  const openEditModal = (event, day) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    setSelectedDate(clickedDate);
    setEditingEvent({
      ...event,
      dateKey: formatDateKey(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      ),
    });
    setEditEventType(event.type);
    setEditEventTitle(event.label);
    setShowEditModal(true);
  };

  const saveEditedEvent = () => {
    if (!editingEvent) return;
    const title = editEventTitle.trim();
    if (!title) return;

    setEvents((prev) => ({
      ...prev,
      [editingEvent.dateKey]: prev[editingEvent.dateKey].map((item) =>
        item.id === editingEvent.id
          ? { ...item, type: editEventType, label: title }
          : item
      ),
    }));

    setShowEditModal(false);
    setEditingEvent(null);
    setEditEventTitle('');
    setEditEventType('interview');
  };

  const deleteEvent = () => {
    if (!editingEvent) return;

    setEvents((prev) => {
      const updatedDayEvents = prev[editingEvent.dateKey].filter(
        (item) => item.id !== editingEvent.id
      );

      const updated = { ...prev };

      if (updatedDayEvents.length === 0) {
        delete updated[editingEvent.dateKey];
      } else {
        updated[editingEvent.dateKey] = updatedDayEvents;
      }

      return updated;
    });

    setShowEditModal(false);
    setEditingEvent(null);
    setEditEventTitle('');
    setEditEventType('interview');
  };

  const selectedDateLabel = selectedDate.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      <Head title="Calendar" />

      <div className="min-h-screen bg-[#e2f4f5] flex">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col">
          <TopBar />
          <header className="bg-white border-b border-gray-200 px-6 py-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-teal-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 2v3M16 2v3M3.75 9.25h16.5M5 5.75h14A1.25 1.25 0 0120.25 7v12A1.25 1.25 0 0119 20.25H5A1.25 1.25 0 013.75 19V7A1.25 1.25 0 015 5.75z"
                    />
                  </svg>
                </span>
                <h1 className="text-[32px] font-normal text-slate-900">
                  Calendar
                </h1>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Manage your job search schedule and important dates
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-teal-700"
            >
              <span className="text-base leading-none">+</span>
              Add Event
            </button>
          </header>
          <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-800">
                  {monthLabel}
                </h2>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goToPreviousMonth}
                    disabled={
                      currentDate.getFullYear() === 2000 &&
                      currentDate.getMonth() === 0
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous month"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={goToNextMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
                    aria-label="Next month"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <p className="mb-5 text-xs text-gray-500">
                Selected date:{' '}
                <span className="font-medium text-gray-700">
                  {selectedDateLabel}
                </span>
              </p>

              <div className="mb-3 grid grid-cols-7 gap-2">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="py-2 text-center text-xs font-medium text-gray-500"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  const dayEvents = getEventsForDay(day);

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => selectDay(day)}
                      className={`min-h-[96px] rounded-xl border bg-white p-2 text-left transition ${
                        day ? 'hover:border-gray-300' : 'cursor-default'
                      } ${
                        isSelectedDay(day)
                          ? 'border-teal-400 ring-2 ring-teal-100'
                          : 'border-gray-200'
                      }`}
                    >
                      {day && (
                        <>
                          <div
                            className={`inline-flex h-6 min-w-[24px] items-center justify-center rounded-md px-1 text-xs font-medium ${
                              isToday(day)
                                ? 'bg-teal-50 text-teal-600'
                                : 'text-gray-600'
                            }`}
                          >
                            {day}
                          </div>

                          <div className="mt-2 space-y-1">
                            {dayEvents.slice(0, 3).map((event) => (
                              <div
                                key={event.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEditModal(event, day);
                                }}
                                className={`truncate rounded-md px-2 py-1 text-[10px] font-medium cursor-pointer ${eventStyles[event.type]}`}
                                title="Click to edit or delete"
                              >
                                {event.label}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-800">
                  Quick Actions
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Add new events quickly
                </p>

                <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600">
                  Click a date in the calendar, then add a titled event.
                </div>

                <div className="mt-5 space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setNewEventType('interview');
                      setNewEventTitle('');
                      setShowAddModal(true);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg border border-teal-200 px-4 py-2.5 text-left text-sm font-medium text-teal-600 transition hover:bg-teal-50"
                  >
                    <span className="text-base leading-none">+</span>
                    Add Interview
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setNewEventType('deadline');
                      setNewEventTitle('');
                      setShowAddModal(true);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg border border-teal-200 px-4 py-2.5 text-left text-sm font-medium text-teal-600 transition hover:bg-teal-50"
                  >
                    <span className="text-base leading-none">+</span>
                    Add Deadline
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setNewEventType('followup');
                      setNewEventTitle('');
                      setShowAddModal(true);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg border border-teal-200 px-4 py-2.5 text-left text-sm font-medium text-teal-600 transition hover:bg-teal-50"
                  >
                    <span className="text-base leading-none">+</span>
                    Add Follow-up
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-800">
                  Event Types
                </h3>

                <div className="mt-5 space-y-4 text-sm text-gray-700">
                  <div className="flex items-center gap-3">
                    <span className="h-3.5 w-3.5 rounded-sm bg-teal-500"></span>
                    <span>Interview</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="h-3.5 w-3.5 rounded-sm bg-red-500"></span>
                    <span>Deadline</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="h-3.5 w-3.5 rounded-sm bg-blue-500"></span>
                    <span>Follow-up</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="h-3.5 w-3.5 rounded-sm bg-purple-500"></span>
                    <span>Networking</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-800">
                  Link Calendars
                </h3>

                <div className="mt-5 space-y-3">
                  <button className="flex w-full items-center gap-3 rounded-lg border border-teal-200 px-4 py-2.5 text-left text-sm font-medium text-teal-600 transition hover:bg-teal-50">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-teal-300 text-xs font-bold">
                      G
                    </span>
                    Google Calendar
                  </button>

                  <button className="flex w-full items-center gap-3 rounded-lg border border-teal-200 px-4 py-2.5 text-left text-sm font-medium text-teal-600 transition hover:bg-teal-50">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-teal-300 text-xs font-bold">
                      O
                    </span>
                    Outlook Calendar
                  </button>

                  <button className="flex w-full items-center gap-3 rounded-lg border border-teal-200 px-4 py-2.5 text-left text-sm font-medium text-teal-600 transition hover:bg-teal-50">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-teal-300 text-xs font-bold">
                      A
                    </span>
                    Apple Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-96 space-y-4 rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800">Add Event</h2>

            <p className="text-sm text-gray-500">
              Add event to:{' '}
              <span className="font-medium text-gray-700">
                {selectedDateLabel}
              </span>
            </p>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Event Type
              </label>
              <select
                value={newEventType}
                onChange={(e) => setNewEventType(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="interview">Interview</option>
                <option value="deadline">Deadline</option>
                <option value="followup">Follow-up</option>
                <option value="networking">Networking</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="Ex: Tech Interview"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={addEvent}
                className="flex-1 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
              >
                Save Event
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setNewEventTitle('');
                }}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-96 space-y-4 rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800">Edit Event</h2>

            <p className="text-sm text-gray-500">
              Editing event on:{' '}
              <span className="font-medium text-gray-700">
                {selectedDateLabel}
              </span>
            </p>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Event Type
              </label>
              <select
                value={editEventType}
                onChange={(e) => setEditEventType(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="interview">Interview</option>
                <option value="deadline">Deadline</option>
                <option value="followup">Follow-up</option>
                <option value="networking">Networking</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={editEventTitle}
                onChange={(e) => setEditEventTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={saveEditedEvent}
                className="flex-1 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={deleteEvent}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}