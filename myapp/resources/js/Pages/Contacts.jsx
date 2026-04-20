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
    const otherCount = contacts.filter((c) => c.type === "other").length;

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

    const typeBadge = (type) => {
        if (type === "recruiter") return "bg-teal-100 text-teal-700 border border-teal-200";
        if (type === "hiring_manager") return "bg-purple-100 text-purple-700 border border-purple-200";
        return "bg-slate-100 text-slate-700 border border-slate-200";
    };

    const typeLabel = (type) => {
        if (type === "recruiter") return "Recruiter";
        if (type === "hiring_manager") return "Hiring Manager";
        return "Other";
    };

    const formatPhone = (phone) => {
        if (!phone) return "";

        const digits = String(phone).replace(/\D/g, "");

        if (digits.length === 10) {
            return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
        }

        if (digits.length === 11 && digits.startsWith("1")) {
            return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
        }

        return phone;
    };

    return (
        <>
            <Head title="Contacts" />
            <div className="min-h-screen flex bg-[#e2f4f5] font-sans">
                <DashboardSidebar />
                <div className="flex-1 flex flex-col">
                      <TopBar user={auth?.user} />
                      
                    {/* Header */}
                    <header className="bg-white border-b border-gray-200 px-6 py-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-[32px] font-normal text-slate-900">
                                Contacts
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Manage your recruiters, hiring managers, and other contacts
                            </p>
                        </div>
                        <button
                            onClick={openAddModal}
                            className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700"
                        >
                            + Add Contact
                        </button>
                    </header>

                    {/* Search + Filters */}
                    <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col gap-4">
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
                            <button
                                onClick={() => setActiveFilter("other")}
                                className={`px-3 py-1.5 rounded-lg text-sm border ${
                                    activeFilter === "other"
                                        ? "bg-teal-600 text-white border-teal-600"
                                        : "bg-white text-gray-800 border-gray-200"
                                }`}
                            >
                                Other ({otherCount})
                            </button>
                        </div>
                    </div>

                    {/* Contact List */}
                    <div className="px-6 py-6">
                        <div className="rounded-2xl bg-[#e2f4f5] p-5">
                            {filteredContacts.length === 0 ? (
                                <div className="rounded-xl bg-white px-6 py-12 text-center text-gray-500">
                                    No contacts found.
                                </div>
                            ) : (
                                <div className="overflow-hidden rounded-xl bg-white">
                                    {filteredContacts.map((contact) => (
                                        <div
                                            key={contact.id}
                                            className="grid min-h-[82px] grid-cols-1 gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0 xl:grid-cols-[minmax(0,1.25fr)_minmax(300px,1fr)_auto] xl:items-center xl:gap-5"
                                        >
                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="truncate text-base font-semibold text-gray-900">
                                                        {contact.name}
                                                    </h3>
                                                    <span className={`shrink-0 text-xs px-2 py-0.5 rounded-lg ${typeBadge(contact.type)}`}>
                                                        {typeLabel(contact.type)}
                                                    </span>
                                                </div>
                                                {(contact.position || contact.company) && (
                                                    <p className="mt-1 truncate text-sm text-gray-600">
                                                        {contact.position}
                                                        {contact.position && contact.company && " at "}
                                                        {contact.company}
                                                    </p>
                                                )}
                                                {contact.notes && (
                                                    <p className="mt-1 truncate text-sm text-gray-500">
                                                        {contact.notes}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="grid gap-2 text-sm md:grid-cols-2">
                                                <div className="min-w-0">
                                                    <div className="flex min-w-0 items-center gap-2">
                                                        <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-gray-400">
                                                            Email
                                                        </span>
                                                        {contact.email ? (
                                                            <a
                                                                href={`mailto:${contact.email}`}
                                                                className="block min-w-0 truncate text-gray-700 hover:text-teal-700"
                                                            >
                                                                {contact.email}
                                                            </a>
                                                        ) : (
                                                            <span className="text-gray-400">Not added</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="flex min-w-0 items-center gap-2">
                                                        <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-gray-400">
                                                            Phone
                                                        </span>
                                                        {contact.phone ? (
                                                            <a
                                                                href={`tel:${String(contact.phone).replace(/\D/g, "")}`}
                                                                className="block min-w-0 truncate text-gray-700 hover:text-teal-700"
                                                            >
                                                                {formatPhone(contact.phone)}
                                                            </a>
                                                        ) : (
                                                            <span className="text-gray-400">Not added</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-end gap-2 xl:justify-end">
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
                                    ))}
                                </div>
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
                                    <option value="other">Other</option>
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
