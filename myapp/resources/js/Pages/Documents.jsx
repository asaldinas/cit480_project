// resources/js/Pages/Documents.jsx
import React, { useRef } from "react";
import { useForm } from "@inertiajs/react";
import DashboardSidebar from "@/Components/DashboardSidebar";

export default function Documents({ documents = [] }) {
    const fileInputRef = useRef(null);

const { data, setData, post, processing, reset } = useForm({
    file: null,
    category: "resume",
    tags: []
});

const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setData("file", file);

    post(route("documents.store"), {
        forceFormData: true,
        onSuccess: () => {
            reset();
        }
    });
};
    return (
        <div className="min-h-screen flex bg-gray-50 font-sans">
            <DashboardSidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white border-b px-6 py-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-900">
                                Documents
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Manage your resumes, cover letters, and other job application documents
                            </p>
                        </div>

                        <button
    onClick={() => fileInputRef.current.click()}
    className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700"
>
    {processing ? "Uploading..." : "Upload Document"}
</button>

<input
    type="file"
    ref={fileInputRef}
    className="hidden"
    onChange={handleFileChange}
/>
                    </div>
                </div>

                {/* Controls */}
                <div className="px-6 py-6 space-y-4">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search documents by name or tags..."
                        className="w-full max-w-2xl bg-gray-100 border border-transparent rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    {/* Filters */}
                    <div className="flex gap-2 flex-wrap">
                        {["All (7)", "Resumes (2)", "Cover Letters (2)", "Portfolio (1)", "Certificates (2)"].map(
                            (filter, idx) => (
                                <button
                                    key={idx}
                                    className={`px-3 py-1.5 rounded-lg text-sm border ${
                                        idx === 0
                                            ? "bg-teal-600 text-white border-teal-600"
                                            : "bg-white text-gray-800 border-gray-200"
                                    }`}
                                >
                                    {filter}
                                </button>
                            )
                        )}
                    </div>
                </div>

                {/* Document List */}
                <div className="px-6 pb-6">
                    <div className="bg-white rounded-2xl border divide-y">
                        {/* Document Row (repeat later) */}
                        <div className="flex justify-between items-center px-4 py-4">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    📄
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium text-gray-900">
                                            Software_Engineer_Resume.pdf
                                        </p>
                                        <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded">
                                            Resume
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-500 mt-1">
                                        245 KB • Uploaded Oct 20, 2025
                                    </p>

                                    <div className="flex gap-2 mt-2">
                                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                                            latest
                                        </span>
                                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                                            tech
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 border border-teal-200 text-teal-700 rounded-lg text-sm">
                                    View
                                </button>
                                <button className="px-3 py-1.5 border border-gray-200 text-gray-700 rounded-lg text-sm">
                                    Download
                                </button>
                                <button className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-sm">
                                    Delete
                                </button>
                            </div>
                        </div>

                        {/* Duplicate rows later */}
                    </div>
                </div>
            </div>
        </div>
    );
}
