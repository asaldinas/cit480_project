import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";

function TodoModal({ isOpen, onClose, pickableApps = [], todo = null }) {
    const isEditMode = !!todo;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        application_id: todo?.application_id || "",
        title: todo?.title || "",
        type: todo?.type || "",
        description: todo?.description || "",
    });

    useEffect(() => {
        if (!isOpen) return;

        setData({
            application_id: todo?.application_id || "",
            title: todo?.title || "",
            type: todo?.type || "",
            description: todo?.description || "",
        });
    }, [isOpen, todo]);

    if (!isOpen) return null;

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        };

        if (isEditMode) {
            put(`/todos/${todo.id}`, options);
        } else {
            post("/todos", options);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-800">
                        {isEditMode ? "Edit Todo" : "Add Todo"}
                    </h2>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Application
                        </label>
                        <select
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#009689] focus:outline-none focus:ring-1 focus:ring-[#7de1cf]"
                            value={data.application_id}
                            onChange={(e) => setData("application_id", e.target.value)}
                        >
                            <option value="">General todo</option>
                            {pickableApps.map((app) => (
                                <option key={app.id} value={app.id}>
                                    {app.company} - {app.position}
                                </option>
                            ))}
                        </select>
                        {errors.application_id && (
                            <p className="mt-1 text-xs text-red-500">{errors.application_id}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Todo <span className="text-red-500">*</span>
                        </label>
                        <input
                            required
                            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#009689] focus:outline-none focus:ring-1 focus:ring-[#7de1cf]"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            placeholder="What needs to happen?"
                        />
                        {errors.title && (
                            <p className="mt-1 text-xs text-red-500">{errors.title}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Quick Actions
                        </label>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            {[
                                { value: "follow_up", label: "Follow Up" },
                                { value: "apply", label: "Apply" },
                            ].map((action) => (
                                <button
                                    key={action.value}
                                    type="button"
                                    onClick={() => setData("type", data.type === action.value ? "" : action.value)}
                                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                                        data.type === action.value
                                            ? "border-[#009689] bg-[#dff7f3] text-[#00786f]"
                                            : "border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                                    }`}
                                >
                                    {action.label}
                                </button>
                            ))}
                        </div>
                        {errors.type && (
                            <p className="mt-1 text-xs text-red-500">{errors.type}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Notes <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <textarea
                            rows="3"
                            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#009689] focus:outline-none focus:ring-1 focus:ring-[#7de1cf]"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            placeholder="Notes about this todo"
                        />
                        {errors.description && (
                            <p className="mt-1 text-xs text-red-500">{errors.description}</p>
                        )}
                    </div>

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
                            disabled={processing}
                            className="rounded-lg bg-[#009689] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#008578] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {processing ? "Saving..." : isEditMode ? "Save changes" : "Add todo"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TodoModal;
