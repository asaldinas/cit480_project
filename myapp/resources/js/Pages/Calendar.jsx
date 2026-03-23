// resources/js/Pages/Analytics.jsx
import React from "react";
import { Link } from "@inertiajs/react";
import DashboardSidebar from "@/Components/DashboardSidebar";

export default function Calendar() {
    return (
        <div className="min-h-screen flex bg-[#e2f4f5] font-sans">
            <DashboardSidebar />

            <div className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow max-w-md text-center">
                    <h1 className="text-3xl font-bold mb-3">Calendar</h1>
                    <p className="text-gray-600 mb-6">
                        This is your placeholder Calendar page.
                    </p>

                    <Link href={route("dashboard")} className="text-blue-600 underline">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
