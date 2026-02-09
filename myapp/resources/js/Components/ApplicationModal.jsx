// resources/js/Components/ApplicationModal.jsx
import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";

function ApplicationModal({
    isOpen,
    onClose,
    defaultStatus = "submitted",
    title,
    application = null, // 👈 if provided, we're editing
}) {
    const isEditMode = !!application;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        company: application?.company || "",
        position: application?.position || "",
        salary: application?.salary || "",
        status: application?.status || defaultStatus, // 'todo' | 'submitted' | 'response'
        location: application?.location || "",
        source: application?.source || "",
        notes: application?.notes || "",
    });

    // If the `application` prop changes (open modal for a different card), sync the form
    useEffect(() => {
        if (application) {
            setData({
                company: application.company || "",
                position: application.position || "",
                salary: application.salary || "",
                status: application.status || defaultStatus,
                location: application.location || "",
                source: application.source || "",
                notes: application.notes || "",
            });
        } else {
            setData({
                company: "",
                position: "",
                salary: "",
                status: defaultStatus,
                location: "",
                source: "",
                notes: "",
            });
        }
    }, [application, defaultStatus, setData]);

    if (!isOpen) return null;

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            // ✏️ EDIT existing application
            put(`/applications/${application.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            // ✨ CREATE new application
            post("/applications", {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    const modalTitle =
        title || (isEditMode ? "Edit Application" : "Add Submitted Application");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-800">
                        {modalTitle}
                    </h2>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                        ✕
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 max-h-[70vh] overflow-y-auto pr-1"
                >
                    {/* Company & Position */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Company <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#009689] focus:outline-none focus:ring-1 focus:ring-[#7de1cf]"
                                value={data.company}
                                onChange={(e) =>
                                    setData("company", e.target.value)
                                }
                                placeholder="e.g., CrowdStrike"
                            />
                            {errors.company && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.company}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Position <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#009689] focus:outline-none focus:ring-1 focus:ring-[#7de1cf]"
                                value={data.position}
                                onChange={(e) =>
                                    setData("position", e.target.value)
                                }
                                placeholder="e.g., Security Analyst Intern"
                            />
                            {errors.position && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.position}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Salary & Location */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Salary / Pay Range
                            </label>
                            <input
                                type="text"
                                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#009689] focus:outline-none focus:ring-1 focus:ring-[#7de1cf]"
                                value={data.salary}
                                onChange={(e) =>
                                    setData("salary", e.target.value)
                                }
                                placeholder="$30–35/hr, $80k–90k, etc."
                            />
                            {errors.salary && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.salary}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Location
                            </label>
                            <input
                                type="text"
                                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#009689] focus:outline-none focus:ring-1 focus:ring-[#7de1cf]"
                                value={data.location}
                                onChange={(e) =>
                                    setData("location", e.target.value)
                                }
                                placeholder="Remote, Los Angeles, CA, etc."
                            />
                            {errors.location && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.location}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* Source */}
                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Application Source
                     </label>

                    <select
                        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#009689] focus:outline-none focus:ring-1 focus:ring-[#7de1cf]"
                        value={data.source}
                        onChange={(e) => setData("source", e.target.value)}
                    >
                            <option value="">Select a source</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Indeed">Indeed</option>
                            <option value="Company site">Company site</option>
                            <option value="Referral">Referral</option>
                            <option value="Other">Other</option>
                    </select>

                        {errors.source && (
                        <p className="mt-1 text-xs text-red-500">{errors.source}</p>
                        )}
                </div>

                    {/* Status (read-only) */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Status
                        </label>
                        <input
                            type="text"
                            disabled
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600"
                            value={data.status}
                        />
                        {errors.status && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.status}
                            </p>
                        )}
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Notes
                        </label>
                        <textarea
                            rows="3"
                            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#009689] focus:outline-none focus:ring-1 focus:ring-[#7de1cf]"
                            value={data.notes}
                            onChange={(e) => setData("notes", e.target.value)}
                            placeholder="Anything you want to remember about this application..."
                        />
                        {errors.notes && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.notes}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-[#009689] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#008578] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {processing
                                ? isEditMode
                                    ? "Saving..."
                                    : "Saving..."
                                : isEditMode
                                ? "Save changes"
                                : "Save application"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ApplicationModal;
