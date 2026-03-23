// resources/js/Pages/Settings.jsx
import React, { useMemo, useState } from "react";
import DashboardSidebar from "@/Components/DashboardSidebar";
import { useForm } from "@inertiajs/react";

function TabButton({ active, children, onClick, icon }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition",
                active
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900 hover:bg-white/60",
            ].join(" ")}
        >
            {icon}
            {children}
        </button>
    );
}

function Input({ label, name, value, onChange, placeholder, error, type = "text" }) {
    return (
        <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600">{label}</label>
            <input
                type={type}
                name={name}
                value={value ?? ""}
                onChange={onChange}
                placeholder={placeholder}
                className={[
                    "w-full rounded-md border bg-gray-50 px-3 py-2 text-sm",
                    "border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none",
                ].join(" ")}
                autoComplete="off"
            />
            {error ? <p className="text-xs text-red-600">{error}</p> : null}
        </div>
    );
}

export default function Settings({ auth }) {
    const user = auth?.user;

    // Tabs
    const tabs = useMemo(() => ["Profile", "Notifications", "Security"], []);
    const [activeTab, setActiveTab] = useState("Profile");

    // Form
    const { data, setData, put, processing, recentlySuccessful, errors } = useForm({
  name: user?.name ?? "",
  email: user?.email ?? "",
  phone: user?.phone ?? "",
  location: user?.location ?? "",
  linkedin_url: user?.linkedin_url ?? "",
  portfolio_url: user?.portfolio_url ?? "",
});

    const onSubmit = (e) => {
        e.preventDefault();
        put(route("settings.profile.update"), {
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen flex bg-[#e2f4f5] font-sans">
            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main */}
            <div className="flex-1 p-6">
                {/* Top header */}
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                            <p className="text-sm text-gray-500">
                                Manage your account preferences and application settings
                            </p>
                        </div>
                    </div>

                    {/* Tabs row */}
                    <div className="mt-4 bg-white/70 border border-white rounded-lg p-2 flex gap-2">
                        <TabButton
                            active={activeTab === "Profile"}
                            onClick={() => setActiveTab("Profile")}
                            icon={<span className="text-gray-400">👤</span>}
                        >
                            Profile
                        </TabButton>
                        <TabButton
                            active={activeTab === "Notifications"}
                            onClick={() => setActiveTab("Notifications")}
                            icon={<span className="text-gray-400">🔔</span>}
                        >
                            Notifications
                        </TabButton>
                        <TabButton
                            active={activeTab === "Security"}
                            onClick={() => setActiveTab("Security")}
                            icon={<span className="text-gray-400">🔒</span>}
                        >
                            Security
                        </TabButton>
                    </div>

                    {/* Panel */}
                    <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-100">
                        {activeTab === "Profile" && (
                            <div className="p-6">
                                <div className="mb-4">
                                    <h2 className="text-base font-semibold text-gray-900">
                                        Profile Information
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Update your personal information and contact details
                                    </p>
                                </div>

                                <form onSubmit={onSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            label="Full Name"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) => setData("name", e.target.value)}
                                            placeholder="John Doe"
                                            error={errors.name}
                                            />
                                    </div>

                                    <Input
                                        label="Email Address"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        placeholder="john.doe@example.com"
                                        error={errors.email}
                                        type="email"
                                    />

                                    <Input
                                        label="Phone Number"
                                        name="phone"
                                        value={data.phone}
                                        onChange={(e) => setData("phone", e.target.value)}
                                        placeholder="(555) 123-4567"
                                        error={errors.phone}
                                    />

                                    <Input
                                        label="Location"
                                        name="location"
                                        value={data.location}
                                        onChange={(e) => setData("location", e.target.value)}
                                        placeholder="San Francisco, CA"
                                        error={errors.location}
                                    />

                                    <Input
                                        label="LinkedIn Profile"
                                        name="linkedin_url"
                                        value={data.linkedin_url}
                                        onChange={(e) => setData("linkedin_url", e.target.value)}
                                        placeholder="linkedin.com/in/johndoe"
                                        error={errors.linkedin_url}
                                    />

                                    <Input
                                        label="Portfolio Website"
                                        name="portfolio_url"
                                        value={data.portfolio_url}
                                        onChange={(e) => setData("portfolio_url", e.target.value)}
                                        placeholder="https://johndoe.dev"
                                        error={errors.portfolio_url}
                                    />

                                    <div className="flex items-center gap-3 pt-2">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className={[
                                                "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold",
                                                "bg-teal-600 text-white hover:bg-teal-700 transition",
                                                processing ? "opacity-60 cursor-not-allowed" : "",
                                            ].join(" ")}
                                        >
                                            💾 Save Changes
                                        </button>

                                        {recentlySuccessful ? (
                                            <span className="text-sm text-teal-700">Saved.</span>
                                        ) : null}
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === "Notifications" && (
                            <div className="p-6">
                                <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    (Placeholder) Add notification toggles here.
                                </p>
                            </div>
                        )}

                        {activeTab === "Security" && (
                            <div className="p-6">
                                <h2 className="text-base font-semibold text-gray-900">Security</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    (Placeholder) Add password / 2FA settings here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}