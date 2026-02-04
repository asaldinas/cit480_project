import React from "react";
import { Link } from "@inertiajs/react";
import DashboardSidebar from "@/Components/DashboardSidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.tsx'

export default function Analytics() {
    return (
        <div className="min-h-screen flex bg-[#e2f4f5] font-sans">
            <DashboardSidebar />

            <div className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow max-w-md text-center">
                    <h1 className="text-3xl font-bold mb-3">Contacts</h1>
                    createRoot(document.getElementById("root")).render(
                        <StrictMode>
                            <App />
                            </StrictMode>
                            )

                    <Link href={route("dashboard")} className="text-blue-600 underline">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
