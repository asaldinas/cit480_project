// resources/js/Pages/Documents.jsx
import React, { useRef } from "react";
import { useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import DashboardSidebar from "@/Components/DashboardSidebar";
import TopBar from "@/Components/TopBar";

export default function Documents() {

const [showModal, setShowModal] = React.useState(false);

const fileInputRef = useRef(null);

const { auth, documents = [] } = usePage().props;
const [activeFilter, setActiveFilter] = React.useState("all");

const filteredDocuments =
    activeFilter === "all"
        ? documents
        : documents.filter((doc) => doc.category === activeFilter);
        const categories = ["resume", "cover_letter", "certificate", "other"];

const categoryCounts = documents.reduce((acc, doc) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1;
    return acc;
}, {});

const totalCount = documents.length;
const { data, setData, post, processing, reset } = useForm({
    file: null,
    category: "resume",
    tags: []
});

const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setData("file", file);
};

const handleSubmit = () => {
    if (!data.file) return;

    post(route("documents.store"), {
        forceFormData: true,
        onError: () => {
            setShowErrorModal(true);
        },
        onSuccess: () => {
            reset();
            setShowModal(false);
        }
    });
};

const badgeColors = {
    resume: "bg-purple-100 text-purple-700",
    cover_letter: "bg-blue-100 text-blue-700",
    certificate: "bg-yellow-100 text-yellow-700",
    other: "bg-gray-200 text-gray-700"
};

const { errors } = usePage().props;

const [showErrorModal, setShowErrorModal] = React.useState(false);


    return (
        <div className="min-h-screen flex bg-gray-50 font-sans">
            <DashboardSidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                 <TopBar user={auth?.user} />
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
   onClick={() => setShowModal(true)}
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
    <button
        onClick={() => setActiveFilter("all")}
        className={`px-3 py-1.5 rounded-lg text-sm border ${
            activeFilter === "all"
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-white text-gray-800 border-gray-200"
        }`}
    >
        All ({totalCount})
    </button>

    {categories.map((cat) => (
        <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm border ${
                activeFilter === cat
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-white text-gray-800 border-gray-200"
            }`}
        >
            {cat
                .replace("_", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}{" "}
            ({categoryCounts[cat] || 0})
        </button>
    ))}
</div>
                </div>

                {/* Document List */}
<div className="bg-white rounded-2xl border divide-y">
    {filteredDocuments.length === 0 ?  (
        <div className="px-6 py-12 text-center text-gray-500">
            No documents uploaded yet.
        </div>
    ) : (
        filteredDocuments.map((doc) => (
            <div
                key={doc.id}
                className="flex justify-between items-center px-4 py-4"
            >
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        📄
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">
                                {doc.original_name}
                            </p>

                            <span
    className={`text-xs px-2 py-0.5 rounded ${
        badgeColors[doc.category] || "bg-gray-100 text-gray-600"
    }`}
>
    {doc.category
        .replace("_", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())}
</span>
                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                            {(doc.size / 1024).toFixed(1)} KB • Uploaded{" "}
                            {new Date(doc.created_at).toLocaleDateString()}
                        </p>

                        {doc.tags?.length > 0 && (
                            <div className="flex gap-2 mt-2">
                                {doc.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="text-xs bg-gray-100 px-2 py-0.5 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-2">
<button
    onClick={() =>
        window.open(route('documents.view', doc.id), "_blank")
    }
    className="px-3 py-1.5 border border-teal-200 text-teal-700 rounded-lg text-sm"
>
    View
</button>
<button
    onClick={() =>
        window.open(route('documents.download', doc.id), "_blank")
    }
    className="px-3 py-1.5 border border-gray-200 text-gray-700 rounded-lg text-sm"
>
    Download
</button>
<button
    onClick={() => {
        if (confirm("Are you sure you want to delete this document?")) {
            router.delete(route("documents.destroy", doc.id));
        }
    }}
    className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-sm"
>
    Delete
</button>
                </div>
            </div>
        ))
    )}
</div>

                                    </div>
    {showModal && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">
                Upload Document
            </h2>

{showErrorModal && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-red-600 mb-4">
                Upload Error
            </h2>

            <div className="space-y-2 text-sm text-gray-700">
                {Object.values(errors).map((error, index) => (
                    <div key={index} className="bg-red-50 border border-red-200 rounded p-2">
                        {error}
                    </div>
                ))}
            </div>

            <div className="flex justify-end mt-6">
                <button
                    onClick={() => setShowErrorModal(false)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
)}

            {/* Category */}
            <div className="mb-4">
                <label className="block text-sm mb-1">
                    Category
                </label>
                <select
                    value={data.category}
                    onChange={(e) =>
                        setData("category", e.target.value)
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                    <option value="resume">Resume</option>
                    <option value="cover_letter">Cover Letter</option>
                    <option value="certificate">Certificate</option>
                    <option value="other">Other</option>
                </select>
            </div>

            {/* File */}
            <div className="mb-4">
                <label className="block text-sm mb-1">
                    Choose File
                </label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full text-sm"
                />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
                <button
                    onClick={() => {
                        reset();
                        setShowModal(false);
                    }}
                    className="px-4 py-2 border rounded-lg text-sm"
                >
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={processing}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm"
                >
                    {processing ? "Uploading..." : "Upload"}
                </button>
            </div>
        </div>
    </div>
)}
                                </div>
                            );
                        }