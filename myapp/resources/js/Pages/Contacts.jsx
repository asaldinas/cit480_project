import React, { useState } from "react";
import { Head, router, usePage, useForm } from "@inertiajs/react";
import DashboardSidebar from "@/Components/DashboardSidebar";
import TopBar from "@/Components/TopBar";


export default function Contacts() {
const { auth, contacts = [], search: initialSearch } = usePage().props;

    const [search, setSearch] = useState(initialSearch || "");
    const [activeFilter, setActiveFilter] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [editingContact, setEditingContact] = useState(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        position: "",
        type: "recruiter",
        notes: "",
    });

    // Search handler (server-side via Inertia)
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        router.get("/contacts", { search: value }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    // Filter contacts client-side
    const filteredContacts =
        activeFilter === "all"
            ? contacts
            : contacts.filter((c) => c.type === activeFilter);

    const recruiterCount = contacts.filter((c) => c.type === "recruiter").length;
    const hiringManagerCount = contacts.filter((c) => c.type === "hiring_manager").length;

    // Open modal for new contact
    const openAddModal = () => {
        reset();
        setEditingContact(null);
        setShowModal(true);
    };

    // Open modal for editing
    const openEditModal = (contact) => {
        setEditingContact(contact);
        setData({
            name: contact.name || "",
            email: contact.email || "",
            phone: contact.phone || "",
            company: contact.company || "",
            position: contact.position || "",
            type: contact.type || "recruiter",
            notes: contact.notes || "",
        });
        setShowModal(true);
    };

    const closeModal = () => {
        reset();
        setEditingContact(null);
        setShowModal(false);
    };

   const handleSubmit = () => {
    if (editingContact) {
        put(route("contacts.update", editingContact.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    } else {
        post(route("contacts.store"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    }
};

    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete this contact?")) return;
        router.delete(route("contacts.destroy", id), {
            preserveScroll: true,
        });
    };

    const typeBadge = (type) =>
        type === "recruiter"
            ? "bg-teal-100 text-teal-700 border border-teal-200"
            : "bg-purple-100 text-purple-700 border border-purple-200";

    const typeLabel = (type) =>
        type === "recruiter" ? "Recruiter" : "Hiring Manager";

    return (
        <>
            <Head title="Contacts" />
            <div className="min-h-screen flex bg-gray-50 font-sans">
                <DashboardSidebar />
                <div className="flex-1 flex flex-col">
                      <TopBar user={auth?.user} />
                      
                    {/* Header */}
                    <div className="bg-white border-b px-6 py-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-[32px] font-normal text-slate-900">
                                    Contacts
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Manage your recruiters and hiring managers
                                </p>
                            </div>
                            <button
                                onClick={openAddModal}
                                className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700"
                            >
                                + Add Contact
                            </button>
                        </div>
                    </div>

                    {/* Search + Filters */}
                    <div className="px-6 py-4 flex flex-col gap-4">
                        {/* Search */}
                        <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-100 rounded-lg w-full max-w-2xl">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                            </svg>
                            <input
                                className="w-full bg-transparent border-none outline-none text-sm placeholder:text-gray-500"
                                placeholder="Search contacts by name, company, or position..."
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>

                        {/* Filter tabs */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveFilter("all")}
                                className={`px-3 py-1.5 rounded-lg text-sm border ${
                                    activeFilter === "all"
                                        ? "bg-teal-600 text-white border-teal-600"
                                        : "bg-white text-gray-800 border-gray-200"
                                }`}
                            >
                                All ({contacts.length})
                            </button>
                            <button
                                onClick={() => setActiveFilter("recruiter")}
                                className={`px-3 py-1.5 rounded-lg text-sm border ${
                                    activeFilter === "recruiter"
                                        ? "bg-teal-600 text-white border-teal-600"
                                        : "bg-white text-gray-800 border-gray-200"
                                }`}
                            >
                                Recruiters ({recruiterCount})
                            </button>
                            <button
                                onClick={() => setActiveFilter("hiring_manager")}
                                className={`px-3 py-1.5 rounded-lg text-sm border ${
                                    activeFilter === "hiring_manager"
                                        ? "bg-teal-600 text-white border-teal-600"
                                        : "bg-white text-gray-800 border-gray-200"
                                }`}
                            >
                                Hiring Managers ({hiringManagerCount})
                            </button>
                        </div>
                    </div>

                    {/* Contact List */}
                    <div className="px-6 pb-6">
                        <div className="bg-white rounded-2xl border divide-y">
                            {filteredContacts.length === 0 ? (
                                <div className="px-6 py-12 text-center text-gray-500">
                                    No contacts found.
                                </div>
                            ) : (
                                filteredContacts.map((contact) => (
                                    <div key={contact.id} className="px-4 py-4 flex justify-between items-start">
                                        <div className="flex flex-col gap-1">
                                            {/* Name + badge */}
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-gray-900">
                                                    {contact.name}
                                                </span>
                                                <span className={`text-xs px-2 py-0.5 rounded-lg ${typeBadge(contact.type)}`}>
                                                    {typeLabel(contact.type)}
                                                </span>
                                            </div>

                                            {/* Position + company */}
                                            {(contact.position || contact.company) && (
                                                <p className="text-sm text-gray-600">
                                                    {contact.position}
                                                    {contact.position && contact.company && " at "}
                                                    {contact.company}
                                                </p>
                                            )}

                                            {/* Notes */}
                                            {contact.notes && (
                                                <p className="text-sm text-gray-500">{contact.notes}</p>
                                            )}
                                        </div>

                                        <div className="flex flex-col items-end gap-1 min-w-fit ml-6">
                                            {/* Email + phone */}
                                            {contact.email && (
                                                <p className="text-sm text-gray-600">{contact.email}</p>
                                            )}
                                            {contact.phone && (
                                                <p className="text-sm text-gray-600">{contact.phone}</p>
                                            )}

                                            {/* Actions */}
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    onClick={() => openEditModal(contact)}
                                                    className="px-3 py-1.5 border border-teal-200 text-teal-700 rounded-lg text-sm hover:bg-teal-50"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(contact.id)}
                                                    className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add / Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
                        <h2 className="text-lg font-semibold mb-4">
                            {editingContact ? "Edit Contact" : "Add Contact"}
                        </h2>

                        <div className="flex flex-col gap-3">
                            <div>
                                <label className="block text-sm mb-1">Name *</label>
                                <input
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 text-sm"
                                    placeholder="Full name"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Type *</label>
                                <select
                                    value={data.type}
                                    onChange={(e) => setData("type", e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 text-sm"
                                >
                                    <option value="recruiter">Recruiter</option>
                                    <option value="hiring_manager">Hiring Manager</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Company</label>
                                <input
                                    value={data.company}
                                    onChange={(e) => setData("company", e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 text-sm"
                                    placeholder="Company name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Position</label>
                                <input
                                    value={data.position}
                                    onChange={(e) => setData("position", e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 text-sm"
                                    placeholder="Job title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 text-sm"
                                    placeholder="email@company.com"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Phone</label>
                                <input
                                    value={data.phone}
                                    onChange={(e) => setData("phone", e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 text-sm"
                                    placeholder="(555) 123-4567"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Notes</label>
                                <textarea
                                    value={data.notes}
                                    onChange={(e) => setData("notes", e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 text-sm"
                                    rows={3}
                                    placeholder="Any notes about this contact..."
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 border rounded-lg text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={processing}
                                className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700"
                            >
                                {processing ? "Saving..." : editingContact ? "Save Changes" : "Add Contact"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
