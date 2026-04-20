import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import DashboardSidebar from "@/Components/DashboardSidebar";
import TopBar from "@/Components/TopBar";

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

function SecurityItem({ title, description }) {
    return (
        <div className="rounded-lg bg-gray-50 px-4 py-4">
            <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-sm font-semibold text-[#00786f]">
                    ✓
                </span>
                <div>
                    <h3 className="text-base font-medium text-gray-900">{title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                </div>
            </div>
        </div>
    );
}

function PolicySection({ title, children }) {
    return (
        <div className="border-t border-gray-200 pt-5 first:border-0 first:pt-0">
            <h3 className="text-base font-medium text-gray-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{children}</p>
        </div>
    );
}

export default function Privacy() {
    const { auth } = usePage().props;
    const [privacySettings, setPrivacySettings] = useState({
        data_collection: true,
        analytics: true,
        marketing: false,
        third_party: false,
        activity_tracking: true,
        email_notifications: true,
    });

    const toggleSetting = (field) => {
        setPrivacySettings((current) => ({
            ...current,
            [field]: !current[field],
        }));
    };

    return (
        <div className="min-h-screen flex bg-[#e2f4f5] font-sans">
            <Head title="Privacy" />

            <DashboardSidebar />

            <div className="flex-1 flex flex-col">
                <TopBar user={auth?.user} />

                <header className="bg-white border-b border-gray-200 px-6 py-6">
                    <h1 className="text-[32px] font-normal text-slate-900">Privacy</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your privacy settings and control how your data is used
                    </p>
                </header>

                <main className="flex-1 p-6">
                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
                        <section className="space-y-6">
                            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                                <div>
                                    <h2 className="text-[28px] font-medium text-gray-900">
                                        Privacy Controls
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Choose what Career-Track can use to personalize your job search.
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <ToggleRow
                                        title="Data Collection"
                                        description="Allow Career-Track to collect usage data"
                                        checked={privacySettings.data_collection}
                                        onChange={() => toggleSetting("data_collection")}
                                    />
                                    <ToggleRow
                                        title="Analytics"
                                        description="Share anonymous analytics data"
                                        checked={privacySettings.analytics}
                                        onChange={() => toggleSetting("analytics")}
                                    />
                                    <ToggleRow
                                        title="Marketing Communications"
                                        description="Receive emails about new features"
                                        checked={privacySettings.marketing}
                                        onChange={() => toggleSetting("marketing")}
                                    />
                                    <ToggleRow
                                        title="Third-Party Sharing"
                                        description="Share anonymized data"
                                        checked={privacySettings.third_party}
                                        onChange={() => toggleSetting("third_party")}
                                    />
                                    <ToggleRow
                                        title="Activity Tracking"
                                        description="Track application activity"
                                        checked={privacySettings.activity_tracking}
                                        onChange={() => toggleSetting("activity_tracking")}
                                    />
                                    <ToggleRow
                                        title="Email Notifications"
                                        description="Receive email updates"
                                        checked={privacySettings.email_notifications}
                                        onChange={() => toggleSetting("email_notifications")}
                                        last
                                    />
                                </div>

                                <div className="mt-4 border-t border-gray-200 pt-5">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-700"
                                    >
                                        Save Privacy Settings
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-[28px] font-medium text-gray-900">
                                            Privacy Policy
                                        </h2>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Last updated: October 25, 2025
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="rounded-lg border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700 transition hover:bg-teal-100"
                                    >
                                        View Full Policy
                                    </button>
                                </div>

                                <div className="mt-6 space-y-5">
                                    <PolicySection title="What Information We Collect">
                                        We collect information you provide directly to us, such as when you create an account, add job applications, or contact support. This includes your name, email address, job application details, and uploaded documents.
                                    </PolicySection>

                                    <PolicySection title="How We Use Your Information">
                                        We use your information to provide, maintain, and improve Career-Track, communicate with you, monitor usage trends, and personalize your experience.
                                    </PolicySection>

                                    <PolicySection title="Information Sharing">
                                        We do not sell your personal information. We may share information with service providers who help operate the platform, only as needed to provide those services.
                                    </PolicySection>

                                    <PolicySection title="Your Rights">
                                        You can access, correct, or delete your personal information. You can also object to or restrict certain processing through the data management tools on this page.
                                    </PolicySection>

                                    <PolicySection title="Data Retention">
                                        We retain your information while your account is active or as needed to provide services. You can request deletion of your data at any time.
                                    </PolicySection>
                                </div>
                            </div>
                        </section>

                        <aside className="space-y-6">
                            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                                <h2 className="text-[28px] font-medium text-gray-900">
                                    Data Security
                                </h2>
                                <p className="mt-2 text-sm text-gray-500">
                                    Built-in protections for your account and documents.
                                </p>

                                <div className="mt-5 space-y-3">
                                    <SecurityItem
                                        title="End-to-End Encryption"
                                        description="Sensitive account data is protected in transit."
                                    />
                                    <SecurityItem
                                        title="Secure Authentication"
                                        description="Account access uses Laravel authentication controls."
                                    />
                                    <SecurityItem
                                        title="Regular Security Audits"
                                        description="Review your account activity and settings regularly."
                                    />
                                    <SecurityItem
                                        title="GDPR Compliant"
                                        description="Data access and deletion controls stay close at hand."
                                    />
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                                <h2 className="text-[28px] font-medium text-gray-900">
                                    Data Management
                                </h2>
                                <p className="mt-2 text-sm text-gray-500">
                                    Export your records or manage your account data.
                                </p>

                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-4">
                                        <div>
                                            <h3 className="text-base font-medium text-gray-900">
                                                Download Your Data
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Export your saved records.
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="rounded-lg border border-teal-200 bg-white px-4 py-2 text-sm font-medium text-teal-700 transition hover:bg-teal-50"
                                        >
                                            Export
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between rounded-lg bg-red-50 px-4 py-4">
                                        <div>
                                            <h3 className="text-base font-medium text-gray-900">
                                                Delete Your Account
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Permanently remove your data.
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>
        </div>
    );
}
