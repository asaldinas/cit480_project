import React, { useState, useEffect, useRef } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import ApplicationModal from "@/Components/ApplicationModal";
import DashboardSidebar from "@/Components/DashboardSidebar";



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
  const initialMonth = now.getMonth();
  const initialYear = now.getFullYear();

  // Get data from server via Inertia
  const {
    search: initialSearch = "",
    todoJobs = [],
    submittedJobs = [],
    responseJobs = [],
  } = usePage().props;

  // Search state
  const [search, setSearch] = useState(initialSearch);

  // Modal state (for add + edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null); // null = new
  const [modalStatus, setModalStatus] = useState("submitted"); // default status when adding

  // ===== Month picker state (React version of dashboard.blade) =====
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [pickerYear, setPickerYear] = useState(initialYear);
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);

  const monthPickerContainerRef = useRef(null);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedCurrentMonthYear = `${monthNames[selectedMonth]} ${selectedYear}`;

  // Close month picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        monthPickerContainerRef.current &&
        !monthPickerContainerRef.current.contains(e.target)
      ) {
        setIsMonthPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectMonth = (monthIndex, year) => {
    setSelectedMonth(monthIndex);
    setSelectedYear(year);
    setIsMonthPickerOpen(false);
  };

  // Quick "next 5 months" list like the original <select>
// Last 5 months including current month
const quickMonths = Array.from({ length: 5 }, (_, i) => {
  const d = new Date(initialYear, initialMonth - i, 1); // go backwards
  return {
    label: `${monthNames[d.getMonth()]} ${d.getFullYear()}`,
    monthIndex: d.getMonth(),
    year: d.getFullYear(),
  };
});


  // ===== User dropdown menu (Settings + Sign Out) =====
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToSettings = () => {
    setIsUserMenuOpen(false);
    router.visit("/settings"); // adjust if your route is different
  };

  const goToSignOut = () => {
    setIsUserMenuOpen(false);
    router.visit("/signout"); // adjust if your route is different
  };

  // ===== Search handler (server-side via Inertia) =====
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

  // Open modal for NEW job
  const openNewJobModal = (status) => {
    setSelectedApplication(null);
    setModalStatus(status);
    setIsModalOpen(true);
  };

  // Open modal for EDIT job
  const openEditModal = (job) => {
    setSelectedApplication(job);
    setModalStatus(job.status || "submitted");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedApplication(null);
    setIsModalOpen(false);
  };

  // Delete handler
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
  <DashboardSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <header className="h-44 border-b border-gray-200 p-6 flex flex-col gap-6 bg-white">
            <div className="flex items-center gap-6">
              <div className="flex-1 flex flex-col gap-2">
                <h1 className="text-[32px] font-normal text-slate-900">
                  {formattedCurrentMonthYear} Dashboard
                </h1>

                {/* Month picker trigger + popup (React version of month picker) */}
                <div
                  className="relative inline-block"
                  ref={monthPickerContainerRef}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setIsMonthPickerOpen((prevOpen) => !prevOpen)
                    }
                    className="inline-flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-[#f3f3f5] text-sm"
                  >
                    <span>{formattedCurrentMonthYear} Dashboard</span>
                    <span className="w-3 h-3 border-l-2 border-b-2 border-slate-500 rotate-[-45deg]" />
                  </button>

                  {isMonthPickerOpen && (
                    <div className="absolute mt-2 w-64 rounded-xl border border-slate-200 bg-white shadow-lg z-20 p-3">
                      {/* Quick next 5 months */}
                      <label className="block mb-1 text-xs font-medium text-slate-600">
                        Quick pick
                      </label>
                      <select
                        className="w-full mb-3 rounded-md border border-slate-200 px-2 py-1 text-sm"
                        onChange={(e) => {
                          const idx = e.target.value;
                          if (!idx) return;
                          const chosen = quickMonths[Number(idx)];
                          handleSelectMonth(chosen.monthIndex, chosen.year);
                        }}
                        defaultValue=""
                      >
                        <option value="">Select…</option>
                        {quickMonths.map((m, idx) => (
                          <option key={m.label} value={idx}>
                            {m.label} Dashboard
                          </option>
                        ))}
                      </select>

                      {/* Year navigation + full month grid */}
                      <div className="flex items-center justify-between mb-2">
                        <button
                          type="button"
                          onClick={() => setPickerYear((y) => y - 1)}
                          className="px-2 py-1 text-sm rounded-md hover:bg-slate-100"
                          aria-label="Previous year"
                        >
                          &#9664;
                        </button>
                        <span className="font-medium text-sm">
                          {pickerYear}
                        </span>
                        <button
                          type="button"
                          onClick={() => setPickerYear((y) => y + 1)}
                          className="px-2 py-1 text-sm rounded-md hover:bg-slate-100"
                          aria-label="Next year"
                        >
                          &#9654;
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {monthNames.map((name, idx) => (
                          <button
                            key={name}
                            type="button"
                            onClick={() => handleSelectMonth(idx, pickerYear)}
                            className="month-btn px-2 py-1 text-xs rounded-md border border-slate-200 bg-slate-50 hover:bg-slate-100 text-center"
                          >
                            {name.slice(0, 3)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="ml-auto flex items-center gap-4">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-gray-200" />

                {/* User dropdown menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() =>
                      setIsUserMenuOpen((prevOpen) => !prevOpen)
                    }
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-black/10 bg-white text-sm"
                  >
                    <span className="w-4 h-4 rounded-full bg-gray-200" />
                    <span>User</span>
                    <span className="w-3 h-3 border-l-2 border-b-2 border-slate-500 rotate-[-45deg]" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 rounded-lg border border-slate-200 bg-white shadow-lg text-sm z-30">
                      <button
                        type="button"
                        onClick={goToSettings}
                        className="w-full text-left px-3 py-2 hover:bg-slate-50"
                      >
                        Settings
                      </button>
                      <button
                        type="button"
                        onClick={goToSignOut}
                        className="w-full text-left px-3 py-2 hover:bg-slate-50 text-red-500"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Search Bar */}
          <div className="border-b border-gray-200 p-6 bg-white">
            <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-100 rounded-lg w-full max-w-xl">
              <img
                src={searchIcon}
                alt="Search"
                className="w-5 h-5 opacity-60"
              />
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
  <div className="flex items-center justify-between">
    <h2 className="text-[20px] font-semibold text-slate-900">
      To Do List
    </h2>

    <button
      type="button"
      onClick={() => openNewJobModal("todo")}
      className="px-3 py-1.5 text-sm rounded-lg border border-[#009689] text-[#009689] hover:bg-[#dff7f3]"
    >
      + Add
    </button>
  </div>

  <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
    {todoJobs.length === 0 ? (
      <p className="text-sm text-slate-500">Nothing to display.</p>
    ) : (
      todoJobs.map(renderJobCard)
    )}
  </div>
</section>

            {/* Submitted Applications */}
            <section className="flex-1 flex flex-col gap-4">
  <div className="flex items-center justify-between">
    <h2 className="text-[20px] font-semibold text-slate-900">
      Submitted Applications
    </h2>

    <button
      type="button"
      onClick={() => openNewJobModal("submitted")}
      className="px-3 py-1.5 text-sm rounded-lg border border-[#009689] text-[#009689] hover:bg-[#dff7f3]"
    >
      + Add
    </button>
  </div>

  <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
    {submittedJobs.length === 0 ? (
      <p className="text-sm text-slate-500">Nothing to display.</p>
    ) : (
      submittedJobs.map(renderJobCard)
    )}
  </div>
</section>

            {/* Responses */}
           <section className="flex-1 flex flex-col gap-4">
  <div className="flex items-center justify-between">
    <h2 className="text-[20px] font-semibold text-slate-900">
      Responses
    </h2>

    <button
      type="button"
      onClick={() => openNewJobModal("response")}
      className="px-3 py-1.5 text-sm rounded-lg border border-[#009689] text-[#009689] hover:bg-[#dff7f3]"
    >
      + Add
    </button>
  </div>

  <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
    {responseJobs.length === 0 ? (
      <p className="text-sm text-slate-500">Nothing to display.</p>
    ) : (
      responseJobs.map(renderJobCard)
    )}
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
        title={selectedApplication ? "Edit Application" : "Add Application"}
        application={selectedApplication}
      />
    </>
  );
}
