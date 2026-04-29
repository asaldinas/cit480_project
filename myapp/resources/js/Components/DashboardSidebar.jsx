import React, { useEffect, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";

import dashboardIcon from "../Assets/icons/dashboard_icon.svg";
import analyticsIcon from "../Assets/icons/analytics_icon.svg";
import calendarIcon from "../Assets/icons/calendar_icon.svg";
import contactsIcon from "../Assets/icons/contacts_icon.svg";
import documentsIcon from "../Assets/icons/documents_icon.svg";
import settingsIcon from "../Assets/icons/settings_icon.svg";
import privacyIcon from "../Assets/icons/privacy_icon.svg";
import appIcon from "../Assets/icons/app_icon.png";

export default function DashboardSidebar() {
  const { url } = usePage();

  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = window.localStorage.getItem("dashboard-sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path) => url === path;

  useEffect(() => {
    window.localStorage.setItem(
      "dashboard-sidebar-collapsed",
      JSON.stringify(isCollapsed)
    );
  }, [isCollapsed]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigateTo = (path) => {
    router.visit(path);
    setIsMobileOpen(false);
  };

  const navButtonClasses = (active) =>
    `w-full flex items-center rounded-xl text-left text-[18px] transition ${
      isCollapsed ? "justify-center px-3 py-3" : "gap-3 px-4 py-2.5"
    } ${
      active
        ? "bg-teal-50 ring-1 ring-[#96f7e4] text-[#00786f]"
        : "text-slate-600 hover:bg-teal-50 hover:text-teal-700"
    }`;

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: dashboardIcon },
    { path: "/analytics", label: "Analytics", icon: analyticsIcon },
    { path: "/calendar", label: "Calendar", icon: calendarIcon },
    { path: "/contacts", label: "Contacts", icon: contactsIcon },
    { path: "/documents", label: "Documents", icon: documentsIcon },
    { path: "/settings", label: "Settings", icon: settingsIcon },
    { path: "/privacy", label: "Privacy", icon: privacyIcon },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="fixed left-4 top-4 z-50 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-slate-700 shadow-md md:hidden"
        aria-label="Open sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isMobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 md:sticky md:z-30 ${
          isCollapsed ? "w-24" : "w-64"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div
          className={`relative flex items-center border-b border-gray-200 px-4 py-6 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          <Link
            href="/"
            className={`flex items-center transition hover:opacity-80 ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <img
              src={appIcon}
              alt="Career-Track Logo"
              className="h-10 w-10 object-contain"
            />

            {!isCollapsed && (
              <span className="text-2xl font-semibold text-[#009689]">
                Career-Track
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            className={`hidden rounded-lg p-2 text-slate-600 transition hover:bg-teal-50 hover:text-teal-700 md:inline-flex ${
              isCollapsed ? "absolute -right-4 top-6 border border-gray-200 bg-white shadow" : ""
            }`}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="absolute right-4 top-6 rounded-lg p-2 text-slate-600 transition hover:bg-teal-50 hover:text-teal-700 md:hidden"
            aria-label="Close sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-3 p-4">
          {navItems.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => navigateTo(item.path)}
              className={navButtonClasses(isActive(item.path))}
              title={isCollapsed ? item.label : ""}
            >
              <img
                src={item.icon}
                alt={item.label}
                className="h-7 w-7 min-w-[28px]"
              />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="mt-auto flex justify-center p-4">
          <Link
            href="/"
            className="flex items-center justify-center rounded-lg p-2 transition hover:bg-teal-50"
            title="Go to welcome page"
          >
            <img
              src={appIcon}
              alt="Career-Track"
              className={isCollapsed ? "h-10 w-10 object-contain" : "h-16 w-16 object-contain"}
            />
          </Link>
        </div>
      </aside>
    </>
  );
}