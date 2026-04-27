import React, { useState } from "react";
import axios from "axios";
import DashboardSidebar from "@/Components/DashboardSidebar";
import { useForm } from "@inertiajs/react";
import { VscAccount } from "react-icons/vsc";
import { FaRegBell } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import TopBar from "@/Components/TopBar";

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

function Input({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    type = "text",
    autoComplete = "off",
}) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
                {label}
            </label>
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
                autoComplete={autoComplete}
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

const jsonHeaders = {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
};

export default function Settings({ auth, two_factor_enabled = false, two_factor_confirmed = false }) {
    const user = auth?.user;
    const [activeTab, setActiveTab] = useState("Profile");

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

    const {
        data: passwordResetData,
        setData: setPasswordResetData,
        post: postPasswordReset,
        processing: passwordResetProcessing,
        recentlySuccessful: passwordResetRecentlySuccessful,
        errors: passwordResetErrors,
    } = useForm({
        email: user?.email ?? "",
    });

    const [notificationData, setNotificationData] = useState({
        email_notifications: true,
        application_reminders: true,
        interview_alerts: true,
        weekly_digest: false,
    });

    const [notificationSaved, setNotificationSaved] = useState(false);

    const [twoFactorEnabled, setTwoFactorEnabled] = useState(Boolean(two_factor_enabled));
    const [twoFactorConfirmed, setTwoFactorConfirmed] = useState(Boolean(two_factor_confirmed));
    const [qrCode, setQrCode] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [recoveryCodes, setRecoveryCodes] = useState([]);
    const [loadingTwoFactor, setLoadingTwoFactor] = useState(false);
    const [twoFactorMessage, setTwoFactorMessage] = useState("");

    const {
        data: twoFactorData,
        setData: setTwoFactorData,
        errors: twoFactorErrors,
        reset: resetTwoFactorForm,
        clearErrors: clearTwoFactorErrors,
        setError: setTwoFactorError,
    } = useForm({
        code: "",
    });

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
        console.log("Notification settings submitted:", notificationData);
        setNotificationSaved(true);

        setTimeout(() => {
            setNotificationSaved(false);
        }, 2000);
    };

    const onPasswordResetSubmit = (e) => {
        e.preventDefault();

        postPasswordReset(route("settings.password.email"), {
            preserveScroll: true,
        });
    };

    const fetchTwoFactorSetup = async () => {
        try {
            const [qrResponse, secretResponse] = await Promise.all([
                axios.get("/user/two-factor-qr-code", { headers: jsonHeaders }),
                axios.get("/user/two-factor-secret-key", { headers: jsonHeaders }),
            ]);

            const qr =
                typeof qrResponse.data === "string"
                    ? qrResponse.data
                    : qrResponse.data?.svg ?? "";

            const secret =
                typeof secretResponse.data === "string"
                    ? secretResponse.data
                    : secretResponse.data?.secretKey ??
                      secretResponse.data?.secret_key ??
                      secretResponse.data?.secret ??
                      "";

            setQrCode(qr);
            setSecretKey(secret);
        } catch (error) {
            console.error("Failed to fetch 2FA setup data:", error?.response ?? error);
            setTwoFactorMessage("Unable to load QR code or setup key.");
        }
    };

    const fetchRecoveryCodes = async () => {
        try {
            const response = await axios.get("/user/two-factor-recovery-codes", {
                headers: jsonHeaders,
            });

            const codes = Array.isArray(response.data)
                ? response.data
                : response.data?.recovery_codes ??
                  response.data?.codes ??
                  [];

            setRecoveryCodes(codes);
        } catch (error) {
            console.error("Failed to fetch recovery codes:", error?.response ?? error);
            setTwoFactorMessage("Unable to load recovery codes.");
        }
    };

    const enableTwoFactor = async () => {
        setLoadingTwoFactor(true);
        setTwoFactorMessage("");
        setQrCode("");
        setSecretKey("");
        setRecoveryCodes([]);

        try {
            await axios.post(
                "/user/two-factor-authentication",
                {},
                { headers: jsonHeaders }
            );

            setTwoFactorEnabled(true);
            setTwoFactorConfirmed(false);

            await fetchTwoFactorSetup();

            setTwoFactorMessage(
                "2FA setup started. Scan the QR code and enter the code from your authenticator app."
            );
        } catch (error) {
            console.error("Failed to enable 2FA:", error?.response ?? error);
            setTwoFactorMessage("Unable to enable 2FA.");
        } finally {
            setLoadingTwoFactor(false);
        }
    };

    const confirmTwoFactor = async (e) => {
        e.preventDefault();
        setTwoFactorMessage("");
        clearTwoFactorErrors("code");

        try {
            await axios.post(
                "/user/confirmed-two-factor-authentication",
                { code: twoFactorData.code },
                { headers: jsonHeaders }
            );

            setTwoFactorConfirmed(true);
            resetTwoFactorForm();
            await fetchRecoveryCodes();
            setTwoFactorMessage("Two-factor authentication is now enabled.");
        } catch (error) {
            console.error("2FA confirmation failed:", error?.response ?? error);

            if (error.response?.status === 422) {
                const msg =
                    error.response?.data?.errors?.code?.[0] ??
                    "The authentication code was invalid. Please try again.";
                setTwoFactorError("code", msg);
                setTwoFactorMessage(msg);
            } else {
                setTwoFactorMessage("Unable to confirm 2FA.");
            }
        }
    };

    const regenerateRecoveryCodes = async () => {
        setTwoFactorMessage("");

        try {
            await axios.post(
                "/user/two-factor-recovery-codes",
                {},
                { headers: jsonHeaders }
            );

            await fetchRecoveryCodes();
            setTwoFactorMessage("Recovery codes regenerated.");
        } catch (error) {
            console.error("Failed to regenerate recovery codes:", error?.response ?? error);
            setTwoFactorMessage("Unable to regenerate recovery codes.");
        }
    };

    const disableTwoFactor = async () => {
        setLoadingTwoFactor(true);
        setTwoFactorMessage("");

        try {
            await axios.delete("/user/two-factor-authentication", {
                headers: jsonHeaders,
            });

            setTwoFactorEnabled(false);
            setTwoFactorConfirmed(false);
            setQrCode("");
            setSecretKey("");
            setRecoveryCodes([]);
            resetTwoFactorForm();
            setTwoFactorMessage("Two-factor authentication has been disabled.");
        } catch (error) {
            console.error("Failed to disable 2FA:", error?.response ?? error);
            setTwoFactorMessage("Unable to disable 2FA.");
        } finally {
            setLoadingTwoFactor(false);
        }
    };

    const onTwoFactorCodeChange = (e) => {
        setTwoFactorData("code", e.target.value);

        if (twoFactorErrors.code) {
            clearTwoFactorErrors("code");
        }
    };

    return (
        <div className="min-h-screen flex bg-[#e2f4f5] font-sans">
            <DashboardSidebar />

            <div className="flex-1 flex flex-col">
                <TopBar user={auth?.user} />

                <div className="flex-1 flex flex-col">
                    <header className="bg-white border-b border-gray-200 px-6 py-6">
                        <h1 className="text-[32px] font-normal text-slate-900">
                            Settings
                        </h1>
                        <p className="text-sm text-gray-500">
                            Manage your account preferences and application settings
                        </p>
                    </header>

                    <div className="flex-1 p-6">
                        <div className="bg-white/70 border border-white rounded-lg p-2 flex gap-2">
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
                                                autoComplete="email"
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
                                            Request a password reset link and manage your account security settings.
                                        </p>
                                    </div>

                                    <form onSubmit={onPasswordResetSubmit} className="mt-8">
                                        <div className="space-y-5">
                                            <Input
                                                label="Email Address"
                                                name="email"
                                                value={passwordResetData.email}
                                                onChange={(e) => setPasswordResetData("email", e.target.value)}
                                                placeholder="john.doe@example.com"
                                                error={passwordResetErrors.email}
                                                type="email"
                                                autoComplete="email"
                                            />
                                        </div>

                                        <div className="mt-4 border-t border-gray-200 pt-5 flex items-center gap-3">
                                            <button
                                                type="submit"
                                                disabled={passwordResetProcessing}
                                                className={[
                                                    "inline-flex items-center rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-700",
                                                    passwordResetProcessing ? "opacity-60 cursor-not-allowed" : "",
                                                ].join(" ")}
                                            >
                                                Email Password Reset Link
                                            </button>

                                            {passwordResetRecentlySuccessful ? (
                                                <span className="text-sm text-teal-700">Reset link sent.</span>
                                            ) : null}
                                        </div>
                                    </form>

                                    <div className="mt-10 border-t border-gray-200 pt-8">
                                        <h3 className="text-[28px] font-medium text-gray-900">
                                            Two-Factor Authentication
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Secure your account with an authenticator app like Duo Mobile,
                                            Google Authenticator, Authy, or Microsoft Authenticator.
                                        </p>

                                        {twoFactorMessage ? (
                                            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                                                {twoFactorMessage}
                                            </div>
                                        ) : null}

                                        {!twoFactorEnabled && (
                                            <button
                                                type="button"
                                                onClick={enableTwoFactor}
                                                disabled={loadingTwoFactor}
                                                className="mt-5 inline-flex items-center rounded-lg border border-teal-200 bg-teal-50 px-5 py-3 text-sm font-medium text-teal-700 transition hover:bg-teal-100 disabled:opacity-60"
                                            >
                                                Enable 2FA
                                            </button>
                                        )}

                                        {twoFactorEnabled && !twoFactorConfirmed && (
                                            <div className="mt-6 space-y-6">
                                                <div>
                                                    <h4 className="text-base font-medium text-gray-900">
                                                        Scan this QR code
                                                    </h4>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Open your authenticator app and scan the QR code below.
                                                    </p>

                                                    {qrCode ? (
                                                        <div
                                                            className="mt-4 inline-block rounded-lg border border-gray-200 bg-white p-4"
                                                            dangerouslySetInnerHTML={{ __html: qrCode }}
                                                        />
                                                    ) : (
                                                        <div className="mt-4 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-500">
                                                            QR code will appear here after setup begins.
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <h4 className="text-base font-medium text-gray-900">
                                                        Manual setup key
                                                    </h4>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        If you cannot scan the QR code, enter this key manually in your authenticator app.
                                                    </p>

                                                    <div className="mt-3 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-900 break-all">
                                                        {secretKey || "Loading..."}
                                                    </div>
                                                </div>

                                                <form onSubmit={confirmTwoFactor} className="space-y-4">
                                                    <Input
                                                        label="Authentication Code"
                                                        name="code"
                                                        value={twoFactorData.code}
                                                        onChange={onTwoFactorCodeChange}
                                                        placeholder="Enter 6-digit code"
                                                        error={twoFactorErrors.code}
                                                        autoComplete="one-time-code"
                                                    />

                                                    <button
                                                        type="submit"
                                                        className="inline-flex items-center rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-700 disabled:opacity-60"
                                                    >
                                                        Confirm 2FA
                                                    </button>
                                                </form>
                                            </div>
                                        )}

                                        {twoFactorEnabled && twoFactorConfirmed && (
                                            <div className="mt-6 space-y-6">
                                                <div>
                                                    <h4 className="text-base font-medium text-gray-900">
                                                        Recovery Codes
                                                    </h4>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Save these recovery codes in a secure place. They can be used if you lose access to your authenticator app.
                                                    </p>

                                                    <div className="mt-4 grid gap-2 rounded-lg bg-gray-50 p-4 text-sm text-gray-900">
                                                        {recoveryCodes.length > 0 ? (
                                                            recoveryCodes.map((code) => (
                                                                <div key={code} className="font-mono">
                                                                    {code}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div>No recovery codes loaded yet.</div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={regenerateRecoveryCodes}
                                                        className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                                    >
                                                        Regenerate Recovery Codes
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={disableTwoFactor}
                                                        disabled={loadingTwoFactor}
                                                        className="inline-flex items-center rounded-lg border border-red-200 bg-white px-5 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-60"
                                                    >
                                                        Disable 2FA
                                                    </button>
                                                </div>
                                            </div>
                                        )}
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
        </div>
    );
}