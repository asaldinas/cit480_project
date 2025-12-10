// resources/js/Components/DashboardSidebar.jsx
import React from "react";
import { router, usePage } from "@inertiajs/react";

import dashboardIcon from "../Assets/icons/dashboard_icon.svg";
import analyticsIcon from "../Assets/icons/analytics_icon.svg";
import calendarIcon from "../Assets/icons/calendar_icon.svg";
import contactsIcon from "../Assets/icons/contacts_icon.svg";
import documentsIcon from "../Assets/icons/documents_icon.svg";
import settingsIcon from "../Assets/icons/settings_icon.svg";
import privacyIcon from "../Assets/icons/privacy_icon.svg";
import writingIcon from "../Assets/icons/writing_icon.svg";
import appIcon from "../Assets/icons/app_icon.png";

export default function DashboardSidebar() {
  const { url } = usePage(); // e.g. "/dashboard", "/Analytics", "/calendar"

  const isActive = (path) => url === path;

  const navButtonClasses = (active) =>
    "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-[18px] " +
    (active
      ? "bg-teal-50 ring-1 ring-[#96f7e4] text-[#00786f]"
      : "text-slate-600 hover:bg-teal-50 hover:text-teal-700");

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-200 flex flex-col items-center justify-center gap-2">
        <span className="text-3xl font-semibold text-[#009689] text-center">
          Career-Track
        </span>
      </div>

      {/* Nav */}
      <nav className="p-4 flex flex-col gap-3">
        {/* Dashboard */}
        <button
          onClick={() => router.visit("/dashboard")}
          className={navButtonClasses(isActive("/dashboard"))}
        >
          <img src={dashboardIcon} alt="Dashboard" className="w-7 h-7" />
          <span>Dashboard</span>
        </button>

        {/* Analytics */}
        <button
          onClick={() => router.visit("/Analytics")} // match your /Analytics route
          className={navButtonClasses(isActive("/Analytics"))}
        >
          <img src={analyticsIcon} className="w-7 h-7" />
          <span>Analytics</span>
        </button>

        {/* Calendar */}
        <button
          onClick={() => router.visit("/calendar")}
          className={navButtonClasses(isActive("/calendar"))}
        >
          <img src={calendarIcon} className="w-7 h-7" />
          <span>Calendar</span>
        </button>

        {/* Contacts */}
        <button
          onClick={() => router.visit("/contacts")}
          className={navButtonClasses(isActive("/contacts"))}
        >
          <img src={contactsIcon} className="w-7 h-7" />
          <span>Contacts</span>
        </button>

        {/* Documents */}
        <button
          onClick={() => router.visit("/documents")}
          className={navButtonClasses(isActive("/documents"))}
        >
          <img src={documentsIcon} className="w-7 h-7" />
          <span>Documents</span>
        </button>

        {/* Todos */}
        <button
          onClick={() => router.visit("/todos")}
          className={navButtonClasses(isActive("/todos"))}
        >
          <img src={writingIcon} className="w-7 h-7" />
          <span>Todos</span>
        </button>

        {/* Settings */}
        <button
          onClick={() => router.visit("/settings")}
          className={navButtonClasses(isActive("/settings"))}
        >
          <img src={settingsIcon} className="w-7 h-7" />
          <span>Settings</span>
        </button>

        {/* Privacy */}
        <button
          onClick={() => router.visit("/privacy")}
          className={navButtonClasses(isActive("/privacy"))}
        >
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
  );
}
