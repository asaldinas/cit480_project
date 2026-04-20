import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";

const RESPONSE_TYPES = [
    { value: "interview",    label: "Interview",    bg: "bg-blue-100 text-blue-700 border-blue-300" },
    { value: "accepted",     label: "Accepted",     bg: "bg-green-100 text-green-700 border-green-300" },
    { value: "rejection",    label: "Rejection",    bg: "bg-red-100 text-red-700 border-red-300" },
    { value: "no_response",  label: "No Response",  bg: "bg-slate-100 text-slate-600 border-slate-300" },
];

function ResponseModal({ isOpen, onClose, pickableApps = [], application = null }) {
    const isEditMode = !!application;
    const [mode, setMode] = useState("pick");
    const [selectedAppId, setSelectedAppId] = useState("");

    const { data, setData, post, put, processing, errors, reset } = useForm({
        company:       "",
        position:      "",
        salary:        "",
        location:      "",
        source:        "",
        link:          "",
        status:        "response",
        response_type: "",
        notes:         "",
    });

    useEffect(() => {
        if (!isOpen) return;
        if (isEditMode) {
            setMode("manual");
            setData({
                company:       application.company || "",
                position:      application.position || "",
                salary:        application.salary || "",
                location:      application.location || "",
                source:        application.source || "",
                link:          application.link || "",
                status:        "response",
                response_type: application.response_type || "",
                notes:         application.notes || "",
            });
        } else {
            setMode("pick");
            setSelectedAppId("");
            setData({
                company: "", position: "", salary: "", location: "",
                source: "", link: "", status: "response", response_type: "", notes: "",
            });
        }
    }, [isOpen, application]);

    const handleAppSelect = (appId) => {
        setSelectedAppId(appId);
        if (appId) {
            const app = pickableApps.find((a) => String(a.id) === String(appId));
            if (app) {
                setData((prev) => ({
                    ...prev,
                    company:  app.company  || "",
                    position: app.position || "",
                    salary:   app.salary   || "",
                    location: app.location || "",
                    source:   app.source   || "",
                    link:     app.link     || "",
                }));
            }
        }
    };

    const handleClose = () => {
        reset();
        setSelectedAppId("");
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            put(`/applications/${application.id}`, {
                onSuccess: () => { reset(); onClose(); },
            });
        } else if (mode === "pick" && selectedAppId) {
            put(`/applications/${selectedAppId}`, {
                onSuccess: () => { reset(); setSelectedAppId(""); onClose(); },
            });
        } else {
            post("/applications", {
                onSuccess: () => { reset(); onClose(); },
            });
        }
    };

    const canSubmit =
        !!data.response_type &&
        (isEditMode || mode === "manual" || (mode === "pick" && !!selectedAppId));

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-800">
                        {isEditMode ? "Edit Response" : "Add Response"}
                    </h2>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                        ✕
                    </button>
                </div>

                {/* Mode toggle (new only) */}
                {!isEditMode && (
                    <div className="mb-5 flex gap-1 rounded-lg bg-slate-100 p-1">
                        <button
                            type="button"
                            onClick={() => setMode("pick")}
                            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition ${
                                mode === "pick"
                                    ? "bg-white shadow-sm text-slate-800"
                                    : "text-slate-500 hover:text-slate-700"
                            }`}
                        >
                            From existing application
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode("manual")}
                            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition ${
                                mode === "manual"
                                    ? "bg-white shadow-sm text-slate-800"
                                    : "text-slate-500 hover:text-slate-700"
                            }`}
                        >
                            Add manually
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Pick existing */}
                    {!isEditMode && mode === "pick" && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Select Application <span className="text-red-500">*</span>
                            </label>
                            <select
                                required
                                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#009689] focus:outline-none focus:ring-1 focus:ring-[#7de1cf]"
                                value={selectedAppId}
                                onChange={(e) => handleAppSelect(e.target.value)}
                            >
                                <option value="">Choose an application…</option>
                                {pickableApps.map((app) => (
                                    <option key={app.id} value={app.id}>
                                        {app.company} — {app.position}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Manual: company + position */}
                    {(isEditMode || mode === "manual") && (
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
                                    onChange={(e) => setData("company", e.target.value)}
                                    placeholder="e.g., CrowdStrike"
                                />
                                {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
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
                                    onChange={(e) => setData("position", e.target.value)}
                                    placeholder="e.g., Security Analyst"
                                />
                                {errors.position && <p className="mt-1 text-xs text-red-500">{errors.position}</p>}
                            </div>
                        </div>
                    )}

                    {/* Response type buttons */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Response Type <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-3">
                            {RESPONSE_TYPES.map(({ value, label, bg }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setData("response_type", value)}
                                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                                        data.response_type === value
                                            ? bg + " ring-2 ring-offset-1 ring-current"
                                            : "border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        {errors.response_type && <p className="mt-1 text-xs text-red-500">{errors.response_type}</p>}
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Notes <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <textarea
                            rows="3"
                            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#009689] focus:outline-none focus:ring-1 focus:ring-[#7de1cf]"
                            value={data.notes}
                            onChange={(e) => setData("notes", e.target.value)}
                            placeholder="Any notes about this response..."
                        />
                    </div>

                    {/* Actions */}
                    <div className="mt-2 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing || !canSubmit}
                            className="rounded-lg bg-[#009689] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#008578] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {processing ? "Saving..." : isEditMode ? "Save changes" : "Add response"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResponseModal;
