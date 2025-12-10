import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import ApplicationModal from "@/Components/ApplicationModal";

// Sidebar icons
import dashboardIcon from "../Assets/icons/dashboard_icon.svg";
import analyticsIcon from "../Assets/icons/analytics_icon.svg";
import calendarIcon from "../Assets/icons/calendar_icon.svg";
import contactsIcon from "../Assets/icons/contacts_icon.svg";
import documentsIcon from "../Assets/icons/documents_icon.svg";
import settingsIcon from "../Assets/icons/settings_icon.svg";
import privacyIcon from "../Assets/icons/privacy_icon.svg";
import writingIcon from "../Assets/icons/writing_icon.svg";

// Logo
import appIcon from "../Assets/icons/app_icon.png";

// Job field icons
import companyIcon from "../Assets/icons/company_icon.svg";
import positionIcon from "../Assets/icons/position_icon.svg";
import salaryIcon from "../Assets/icons/salary_icon.svg";

// Search
import searchIcon from "../Assets/icons/search_icon.svg";

export default function Dashboard() {
  const now = new Date();
  const currentMonthYear = now.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Get data from server via Inertia
  const {
    search: initialSearch = "",
    todoJobs = [],
    submittedJobs = [],
    responseJobs = [],
  } = usePage().props;

  // Search state
  const [search, setSearch] = useState(initialSearch);

  // 🔥 Modal state (for add + edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null); // null = new
  const [modalStatus, setModalStatus] = useState("submitted"); // default status when adding

  // Handle search changes (server-side)
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    router.get(
      "/dashboard",
      { search: value },
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      }
    );
  };

  // 👉 Open modal for NEW job in a specific column
  const openNewJobModal = (status) => {
    setSelectedApplication(null);
    setModalStatus(status);
    setIsModalOpen(true);
  };

  // 👉 Open modal for EDIT job
  const openEditModal = (job) => {
    setSelectedApplication(job);
    setModalStatus(job.status || "submitted");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedApplication(null);
    setIsModalOpen(false);
  };

  // 🗑️ Delete handler
  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    router.delete(`/applications/${id}`);
  };

  // Small reusable card renderer (so each column looks consistent)
  const renderJobCard = (job) => (
    <div
      key={job.id}
      className="rounded-xl border border-slate-100 bg-white p-3 flex flex-col gap-3 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <img src={companyIcon} className="w-5 h-5" />
        <div>
          <span className="text-xs text-gray-500">Company</span>
          <div className="text-base font-medium">{job.company}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <img src={positionIcon} className="w-5 h-5" />
        <div>
          <span className="text-xs text-gray-500">Position</span>
          <div className="text-base font-medium">{job.position}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <img src={salaryIcon} className="w-5 h-5" />
        <div>
          <span className="text-xs text-gray-500">Salary</span>
          <div className="text-base font-medium">
            {job.salary || "—"}
          </div>
        </div>
      </div>

      {job.location && (
        <p className="text-xs text-slate-500">
          Location {job.location}
        </p>
      )}

      {job.notes && (
        <p className="text-xs text-slate-600 line-clamp-3">
          {job.notes}
        </p>
      )}

      <div className="mt-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => openEditModal(job)}
          className="px-3 py-1 text-xs rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => handleDelete(job.id)}
          className="px-3 py-1 text-xs rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Head title="Dashboard" />

      <div className="min-h-screen flex bg-[#e2f4f5] font-sans">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          {/* Logo */}
          <div className="px-6 py-6 border-b border-gray-200 flex flex-col items-center justify-center gap-2">
            <span className="text-3xl font-semibold text-[#009689] text-center">
              Career-Track
            </span>
          </div>

          {/* Nav */}
          <nav className="p-4 flex flex-col gap-3">
            {/* Dashboard item */}
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-[18px] text-slate-700 bg-teal-50 ring-1 ring-[#96f7e4] text-[#00786f]">
              <img src={dashboardIcon} alt="Dashboard" className="w-7 h-7" />
              <span>Dashboard</span>
            </button>

            <button 
            onClick={() => window.location.href = '/Analytics'}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-[18px] text-slate-600 hover:bg-teal-50 hover:text-teal-700"
            >
              <img src={analyticsIcon} className="w-7 h-7" />
              <span>Analytics</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-[18px] text-slate-600 hover:bg-teal-50 hover:text-teal-700">
              <img src={calendarIcon} className="w-7 h-7" />
              <span>Calendar</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-[18px] text-slate-600 hover:bg-teal-50 hover:text-teal-700">
              <img src={contactsIcon} className="w-7 h-7" />
              <span>Contacts</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-[18px] text-slate-600 hover:bg-teal-50 hover:text-teal-700">
              <img src={documentsIcon} className="w-7 h-7" />
              <span>Documents</span>
            </button>

            <button
        onClick={() => window.location.href = '/todos'}
        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-[18px] text-slate-600 hover:bg-teal-50 hover:text-teal-700"
        >
        <img src={writingIcon} className="w-7 h-7" />
        <span>Todos</span>
        </button>

            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-[18px] text-slate-600 hover:bg-teal-50 hover:text-teal-700">
              <img src={settingsIcon} className="w-7 h-7" />
              <span>Settings</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-[18px] text-slate-600 hover:bg-teal-50 hover:text-teal-700">
              <img src={privacyIcon} className="w-7 h-7" />
              <span>Privacy</span>
            </button>
          </nav>

          {/* Sidebar Footer Logo */}
          <div className="mt-auto p-4 flex justify-center">
            <div className="w-24 h-20 flex items-center justify-center bg-white">
              <img
                src={appIcon}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <header className="h-44 border-b border-gray-200 p-6 flex flex-col gap-6 bg-white">
            <div className="flex items-center gap-6">
              <div className="flex-1 flex flex-col gap-2">
                <h1 className="text-[32px] font-normal text-slate-900">
                  {currentMonthYear} Dashboard
                </h1>

                <button className="inline-flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-[#f3f3f5] text-sm">
                  <span>{currentMonthYear} Dashboard</span>
                  <span className="w-3 h-3 border-l-2 border-b-2 border-slate-500 rotate-[-45deg]" />
                </button>
              </div>

              <div className="ml-auto flex items-center gap-4">
                <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-black/10 bg-white text-sm">
                  <span className="w-4 h-4 rounded-full bg-gray-200" />
                  <span>User</span>
                  <span className="w-3 h-3 border-l-2 border-b-2 border-slate-500 rotate-[-45deg]" />
                </button>

                <div className="w-10 h-10 rounded-full bg-gray-200" />
              </div>
            </div>
          </header>

          {/* Search Bar */}
          <div className="border-b border-gray-200 p-6 bg-white">
            <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-100 rounded-lg w-full max-w-xl">
              {/* Search icon */}
              <img
                src={searchIcon}
                alt="Search"
                className="w-5 h-5 opacity-60"
              />

              {/* Input */}
              <input
                className="w-full bg-transparent border-none outline-none text-[16px] placeholder:text-slate-500"
                placeholder="Search jobs, companies, or positions..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Columns */}
          <main className="flex gap-6 p-6">
            {/* To Do List */}
            <section className="flex-1 flex flex-col gap-4">
              <h2 className="text-[20px] font-semibold text-slate-900">
                To Do List
              </h2>

              <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
                {todoJobs.length === 0 ? (
                  <p className="text-sm text-slate-500">Nothing to display.</p>
                ) : (
                  todoJobs.map(renderJobCard)
                )}
              </div>

              <div className="border-2 border-dashed border-[#96d7d0] bg-teal-50 rounded-xl p-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => openNewJobModal("todo")}
                  className="px-3 py-2 rounded-lg border border-[#009689] text-[#009689] hover:bg-[#dff7f3]"
                >
                  + Add new job
                </button>
              </div>
            </section>

            {/* Submitted Applications */}
            <section className="flex-1 flex flex-col gap-4">
              <h2 className="text-[20px] font-semibold text-slate-900">
                Submitted Applications
              </h2>

              <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
                {submittedJobs.length === 0 ? (
                  <p className="text-sm text-slate-500">Nothing to display.</p>
                ) : (
                  submittedJobs.map(renderJobCard)
                )}
              </div>

              <div className="border-2 border-dashed border-[#96d7d0] bg-teal-50 rounded-xl p-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => openNewJobModal("submitted")}
                  className="px-3 py-2 rounded-lg border border-[#009689] text-[#009689] hover:bg-[#dff7f3]"
                >
                  + Add new job
                </button>
              </div>
            </section>

            {/* Responses */}
            <section className="flex-1 flex flex-col gap-4">
              <h2 className="text-[20px] font-semibold text-slate-900">
                Responses
              </h2>

              <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
                {responseJobs.length === 0 ? (
                  <p className="text-sm text-slate-500">Nothing to display.</p>
                ) : (
                  responseJobs.map(renderJobCard)
                )}
              </div>

              <div className="border-2 border-dashed border-[#96d7d0] bg-teal-50 rounded-xl p-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => openNewJobModal("response")}
                  className="px-3 py-2 rounded-lg border border-[#009689] text-[#009689] hover:bg-[#dff7f3]"
                >
                  + Add new job
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Shared modal for ADD + EDIT */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        defaultStatus={modalStatus}
        title={
          selectedApplication ? "Edit Application" : "Add Application"
        }
        application={selectedApplication}
      />
    </>
  );
}
