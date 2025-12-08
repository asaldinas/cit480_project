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
