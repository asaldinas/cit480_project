import React, { useState } from "react";
import DashboardSidebar from "@/Components/DashboardSidebar";
import { useForm } from "@inertiajs/react";
import { VscAccount } from "react-icons/vsc";
import { FaRegBell } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

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
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">{label}</label>
            <input
                type={type}
                name={name}
                value={value ?? ""}
                onChange={onChange}
                placeholder={placeholder}
                className={[
                    "w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-900",
                    "placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition",
                ].join(" ")}
                autoComplete="off"
            />
            {error ? <p className="text-xs text-red-600">{error}</p> : null}
        </div>
    );
}

function SecurityInput({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    type = "password",
}) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">{label}</label>
            <input
                type={type}
                name={name}
                value={value ?? ""}
                onChange={onChange}
                placeholder={placeholder}
                className={[
                    "w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-900",
                    "placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition",
                ].join(" ")}
                autoComplete="off"
            />
            {error ? <p className="text-xs text-red-600">{error}</p> : null}
        </div>
    );
}

function ToggleRow({ title, description, checked, onChange, last = false }) {
    return (
        <div
            className={[
                "flex items-center justify-between py-6",
                !last ? "border-b border-gray-200" : "",
            ].join(" ")}
        >
            <div className="pr-4">
                <h3 className="text-base font-medium text-gray-900">{title}</h3>
                <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>

            <button
                type="button"
                onClick={onChange}
                aria-pressed={checked}
                className={[
                    "relative inline-flex h-7 w-14 shrink-0 items-center rounded-full transition",
                    checked ? "bg-slate-900" : "bg-gray-300",
                ].join(" ")}
            >
                <span
                    className={[
                        "inline-block h-5 w-5 transform rounded-full bg-white transition",
                        checked ? "translate-x-8" : "translate-x-1",
                    ].join(" ")}
                />
            </button>
        </div>
    );
}

export default function Settings({ auth }) {
    const user = auth?.user;
    const [activeTab, setActiveTab] = useState("Profile");

    // Profile form
    const {
        data,
        setData,
        put,
        processing,
        recentlySuccessful,
        errors,
    } = useForm({
        name: user?.name ?? "",
        email: user?.email ?? "",
        phone: user?.phone ?? "",
        location: user?.location ?? "",
        linkedin_url: user?.linkedin_url ?? "",
        portfolio_url: user?.portfolio_url ?? "",
    });

    // Notifications form
    const [notificationData, setNotificationData] = useState({
        email_notifications: true,
        application_reminders: true,
        interview_alerts: true,
        weekly_digest: false,
    });

    const [notificationSaved, setNotificationSaved] = useState(false);

    // Security form
    const [securityData, setSecurityData] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const [securityErrors, setSecurityErrors] = useState({});

    const onSubmit = (e) => {
        e.preventDefault();
        put(route("settings.profile.update"), {
            preserveScroll: true,
        });
    };

    const toggleNotification = (field) => {
        setNotificationData((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
        setNotificationSaved(false);
    };

    const onNotificationsSubmit = (e) => {
        e.preventDefault();

        // Replace later with Inertia submit when backend route is ready
        console.log("Notification settings submitted:", notificationData);

        setNotificationSaved(true);

        setTimeout(() => {
            setNotificationSaved(false);
        }, 2000);
    };

    const onSecurityChange = (e) => {
        const { name, value } = e.target;

        setSecurityData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (securityErrors[name]) {
            setSecurityErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const onSecuritySubmit = (e) => {
        e.preventDefault();

        const nextErrors = {};

        if (!securityData.current_password) {
            nextErrors.current_password = "Current password is required.";
        }

        if (!securityData.password) {
            nextErrors.password = "New password is required.";
        }

        if (!securityData.password_confirmation) {
            nextErrors.password_confirmation = "Please confirm your new password.";
        }

        if (
            securityData.password &&
            securityData.password_confirmation &&
            securityData.password !== securityData.password_confirmation
        ) {
            nextErrors.password_confirmation = "Passwords do not match.";
        }

        setSecurityErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) return;

        // Replace later with Inertia/Laravel submission when your backend route is ready
        console.log("Security form submitted:", securityData);

        setSecurityData({
            current_password: "",
            password: "",
            password_confirmation: "",
        });
    };

    return (
        <div className="min-h-screen flex bg-[#e2f4f5] font-sans">
            <DashboardSidebar />

            <div className="flex-1 p-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                            <p className="text-sm text-gray-500">
                                Manage your account preferences and application settings
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 bg-white/70 border border-white rounded-lg p-2 flex gap-2">
                        <TabButton
                            active={activeTab === "Profile"}
                            onClick={() => setActiveTab("Profile")}
                            icon={<span className="text-gray-400"><VscAccount /></span>}
                        >
                            Profile
                        </TabButton>

                        <TabButton
                            active={activeTab === "Notifications"}
                            onClick={() => setActiveTab("Notifications")}
                            icon={<span className="text-gray-400"><FaRegBell /></span>}
                        >
                            Notifications
                        </TabButton>

                        <TabButton
                            active={activeTab === "Security"}
                            onClick={() => setActiveTab("Security")}
                            icon={<span className="text-gray-400"><MdLockOutline /></span>}
                        >
                            Security
                        </TabButton>
                    </div>

                    <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-100">
                        {activeTab === "Profile" && (
                        <div className="p-6">
                            <div>
                                <h2 className="text-[28px] font-medium text-gray-900">
                                    Profile Information
                                </h2>
                                <p className="mt-2 text-sm text-gray-500">
                                    Update your personal information and contact details
                                </p>
                            </div>

                            <form onSubmit={onSubmit} className="mt-8">
                                <div className="space-y-5">
                                    <Input
                                        label="Full Name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        placeholder="John Doe"
                                        error={errors.name}
                                    />

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
                                </div>

                                <div className="mt-4 border-t border-gray-200 pt-5 flex items-center gap-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={[
                                            "inline-flex items-center rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-700",
                                            processing ? "opacity-60 cursor-not-allowed" : "",
                                        ].join(" ")}
                                    >
                                        Save Changes
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
                                <div className="mb-4">
                                    <h2 className="text-[28px] font-medium text-gray-900">
                                        Notification Preferences
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Choose how you want to be notified about your job applications
                                    </p>
                                </div>

                                <form onSubmit={onNotificationsSubmit}>
                                    <ToggleRow
                                        title="Email Notifications"
                                        description="Receive email updates about your applications"
                                        checked={notificationData.email_notifications}
                                        onChange={() => toggleNotification("email_notifications")}
                                    />

                                    <ToggleRow
                                        title="Application Reminders"
                                        description="Get reminded about pending applications and deadlines"
                                        checked={notificationData.application_reminders}
                                        onChange={() => toggleNotification("application_reminders")}
                                    />

                                    <ToggleRow
                                        title="Interview Alerts"
                                        description="Receive notifications about upcoming interviews"
                                        checked={notificationData.interview_alerts}
                                        onChange={() => toggleNotification("interview_alerts")}
                                    />

                                    <ToggleRow
                                        title="Weekly Digest"
                                        description="Get a weekly summary of your job search activity"
                                        checked={notificationData.weekly_digest}
                                        onChange={() => toggleNotification("weekly_digest")}
                                        last
                                    />

                                    <div className="mt-4 border-t border-gray-200 pt-5 flex items-center gap-3">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-700"
                                        >
                                            Save Preferences
                                        </button>

                                        {notificationSaved ? (
                                            <span className="text-sm text-teal-700">Saved.</span>
                                        ) : null}
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === "Security" && (
                            <div className="p-6">
                                <div>
                                    <h2 className="text-[28px] font-medium text-gray-900">
                                        Security Settings
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Manage your password and account security
                                    </p>
                                </div>

                                <form onSubmit={onSecuritySubmit} className="mt-8">
                                    <div className="space-y-5">
                                        <SecurityInput
                                            label="Current Password"
                                            name="current_password"
                                            value={securityData.current_password}
                                            onChange={onSecurityChange}
                                            placeholder="Enter current password"
                                            error={securityErrors.current_password}
                                        />

                                        <SecurityInput
                                            label="New Password"
                                            name="password"
                                            value={securityData.password}
                                            onChange={onSecurityChange}
                                            placeholder="Enter new password"
                                            error={securityErrors.password}
                                        />

                                        <SecurityInput
                                            label="Confirm New Password"
                                            name="password_confirmation"
                                            value={securityData.password_confirmation}
                                            onChange={onSecurityChange}
                                            placeholder="Confirm new password"
                                            error={securityErrors.password_confirmation}
                                        />
                                    </div>

                                    <div className="mt-4 border-t border-gray-200 pt-5">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-700"
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                </form>

                                <div className="mt-10 border-t border-gray-200 pt-8">
                                    <h3 className="text-[28px] font-medium text-gray-900">
                                        Two-Factor Authentication
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Add an extra layer of security to your account
                                    </p>

                                    <button
                                        type="button"
                                        className="mt-5 inline-flex items-center rounded-lg border border-teal-200 bg-teal-50 px-5 py-3 text-sm font-medium text-teal-700 transition hover:bg-teal-100"
                                    >
                                        Enable 2FA
                                    </button>
                                </div>

                                <div className="mt-10 border-t border-gray-200 pt-8">
                                    <h3 className="text-[28px] font-medium text-gray-900">
                                        Active Sessions
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Manage your active sessions across devices
                                    </p>

                                    <div className="mt-5 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-4">
                                        <div>
                                            <p className="text-base font-medium text-gray-900">
                                                Chrome on Windows
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                San Francisco, CA • Active now
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            className="rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}