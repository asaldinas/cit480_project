// resources/js/Pages/Analytics.jsx
import React, {useMemo} from "react";
import { Link } from "@inertiajs/react";
import DashboardSidebar from "@/Components/DashboardSidebar";
import { usePage } from "@inertiajs/react";

function StatCard({ title, value, subtext, icon }) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <p className="text-sm text-slate-500">{title}</p>
                <span className="h-9 w-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                    {icon}
                </span>
            </div>
            <div className="mt-4">
                <div className="text-3xl font-semibold text-slate-900">{value}</div>
                {subtext ? (
                    <div className="mt-1 text-sm text-teal-700">{subtext}</div>
                ) : null}
            </div>
        </div>
    );
}

function Card({ title, subtitle, children, footer }) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div>
                <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
                {subtitle ? (
                    <p className="text-sm text-slate-500">{subtitle}</p>
                ) : null}
            </div>

            <div className="mt-6">{children}</div>

            {footer ? <div className="mt-4">{footer}</div> : null}
        </div>
    );
}

export default function Analytics() {
    const { props } = usePage();

    const kpis = props.kpis ?? {
        totalApplications: 0,
        totalThisWeek: 0,
        responseRate: null,
        responseRateDelta: null,
        avgResponseTimeDays: null,
        medianResponseTimeDays: null,
        interviewRate: null,
        interviewsSecured: null,
    };


    const status = useMemo(
        () => [
            { label: "To Do List", value: 8, color: "#94a3b8" }, // slate-400
            { label: "Submitted", value: 15, color: "#14b8a6" }, // teal-500
            { label: "Responses", value: 6, color: "#3b82f6" }, // blue-500
            { label: "Rejections", value: 4, color: "#ef4444" }, // red-500
        ],
        []
    );

    const statusTotal = status.reduce((sum, s) => sum + s.value, 0);

    // CSS donut via conic-gradient based on the status array
    const donutStyle = useMemo(() => {
        let start = 0;
        const parts = status.map((s) => {
            const pct = statusTotal === 0 ? 0 : (s.value / statusTotal) * 100;
            const end = start + pct;
            const seg = `${s.color} ${start}% ${end}%`;
            start = end;
            return seg;
        });
        return {
            background: `conic-gradient(${parts.join(", ")})`,
        };
    }, [status, statusTotal]);

    const monthly = useMemo(
        () => [
            { month: "Jun", applications: 5, interviews: 1, responses: 2 },
            { month: "Jul", applications: 8, interviews: 2, responses: 3 },
            { month: "Aug", applications: 12, interviews: 3, responses: 5 },
            { month: "Sep", applications: 10, interviews: 2, responses: 4 },
            { month: "Oct", applications: 15, interviews: 4, responses: 6 },
        ],
        []
    );

    const maxMonthly = Math.max(
        ...monthly.map((m) => Math.max(m.applications, m.interviews, m.responses))
    );

    const sources = useMemo(
        () => [
            { label: "LinkedIn", value: 18 },
            { label: "Indeed", value: 12 },
            { label: "Company Site", value: 8 },
            { label: "Referral", value: 5 },
            { label: "Other", value: 3 },
        ],
        []
    );
    const maxSource = Math.max(...sources.map((s) => s.value));

    const responseBins = useMemo(
        () => [
            { label: "0–3 days", value: 4 },
            { label: "4–7 days", value: 8 },
            { label: "8–14 days", value: 5 },
            { label: "15–30 days", value: 3 },
            { label: "30+ days", value: 2 },
        ],
        []
    );
    const maxBin = Math.max(...responseBins.map((b) => b.value));

    return (
        <div className="min-h-screen flex bg-[#e2f4f5] font-sans">
            <DashboardSidebar />

            <div className="flex-1 flex flex-col">
                {/* Top header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center">
                    <div className="w-full px-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-lg font-semibold text-slate-900">
                                Analytics
                            </h1>
                            <p className="text-sm text-slate-500">
                                Track your job search progress and performance metrics
                            </p>
                        </div>

                        {/* Optional controls */}
                        <div className="hidden sm:flex items-center gap-3">
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M3 4h18M6 10h12M10 16h4M11 20h2" />
                                </svg>
                                Filters
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-3 py-2 text-sm font-medium text-white hover:bg-teal-700"
                            >
                                Export
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 px-6 py-6">
                    <div className="space-y-6">
                        {/* KPI cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                            <StatCard
                                title="Total Applications"
                                value={kpis.totalApplications}
                                subtext={`+${kpis.totalThisWeek} this week`}
                                icon={
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M4 19V5m0 14h16" />
                                        <path d="M8 17V9M12 17V7M16 17v-5" />
                                    </svg>
                                }
                            />

                            <StatCard
                                title="Response Rate"
                                value={`${kpis.responseRate.toFixed(1)}%`}
                                subtext={`+${kpis.responseRateDelta.toFixed(
                                    1
                                )}% vs last month`}
                                icon={
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M3 17l6-6 4 4 7-7" />
                                        <path d="M14 8h6v6" />
                                    </svg>
                                }
                            />

                            <StatCard
                                title="Avg. Response Time"
                                value={`${kpis.avgResponseTimeDays.toFixed(1)} days`}
                                subtext={`Median: ${kpis.medianResponseTimeDays} days`}
                                icon={
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M12 8v5l3 2" />
                                        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                }
                            />

                            <StatCard
                                title="Interview Rate"
                                value={`${kpis.interviewRate.toFixed(1)}%`}
                                subtext={`${kpis.interviewsSecured} interviews secured`}
                                icon={
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M12 3v18" />
                                        <path d="M3 12h18" />
                                        <path d="M7 7h10v10H7z" />
                                    </svg>
                                }
                            />
                        </div>

                        {/* Middle charts */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            <Card
                                title="Application Status"
                                subtitle="Current distribution of your applications"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                                    {/* Donut */}
                                    <div className="lg:col-span-2 flex items-center justify-center">
                                        <div className="relative h-56 w-56">
                                            <div
                                                className="absolute inset-0 rounded-full"
                                                style={donutStyle}
                                            />
                                            <div className="absolute inset-6 rounded-full bg-white border border-slate-200" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-xs text-slate-500">
                                                        Total
                                                    </div>
                                                    <div className="text-xl font-semibold text-slate-900">
                                                        {statusTotal}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Legend */}
                                    <div className="space-y-3">
                                        {status.map((s) => {
                                            const pct =
                                                statusTotal === 0
                                                    ? 0
                                                    : (s.value / statusTotal) * 100;
                                            return (
                                                <div
                                                    key={s.label}
                                                    className="flex items-center justify-between text-sm"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className="h-2.5 w-2.5 rounded-full"
                                                            style={{ backgroundColor: s.color }}
                                                        />
                                                        <span className="text-slate-700">
                                                            {s.label}
                                                        </span>
                                                    </div>
                                                    <span className="text-slate-500">
                                                        {s.value}{" "}
                                                        <span className="text-slate-400">
                                                            ({pct.toFixed(0)}%)
                                                        </span>
                                                    </span>
                                                </div>
                                            );
                                        })}

                                        <div className="pt-3 border-t border-slate-200 text-xs text-slate-500 space-y-1">
                                            <div className="flex justify-between">
                                                <span>Tip</span>
                                                <span>
                                                    Add statuses like Interview/Offer later
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card
                                title="Applications Over Time"
                                subtitle="Monthly application activity"
                                footer={
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="h-2.5 w-2.5 rounded bg-teal-500" />
                                            <span className="text-slate-600">
                                                Applications
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="h-2.5 w-2.5 rounded bg-violet-500" />
                                            <span className="text-slate-600">
                                                Interviews
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="h-2.5 w-2.5 rounded bg-blue-500" />
                                            <span className="text-slate-600">
                                                Responses
                                            </span>
                                        </div>
                                    </div>
                                }
                            >
                                {/* Simple grouped bar chart (no chart library) */}
                                <div className="h-64 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
                                    <div className="h-full flex items-end justify-between gap-3">
                                        {monthly.map((m) => (
                                            <div
                                                key={m.month}
                                                className="flex-1 flex flex-col items-center gap-2"
                                            >
                                                <div className="w-full flex items-end justify-center gap-1">
                                                    <div
                                                        className="w-3 rounded-md bg-teal-500"
                                                        style={{
                                                            height:
                                                                (m.applications /
                                                                    maxMonthly) *
                                                                    180 +
                                                                12,
                                                        }}
                                                        title={`Applications: ${m.applications}`}
                                                    />
                                                    <div
                                                        className="w-3 rounded-md bg-violet-500"
                                                        style={{
                                                            height:
                                                                (m.interviews /
                                                                    maxMonthly) *
                                                                    180 +
                                                                12,
                                                        }}
                                                        title={`Interviews: ${m.interviews}`}
                                                    />
                                                    <div
                                                        className="w-3 rounded-md bg-blue-500"
                                                        style={{
                                                            height:
                                                                (m.responses /
                                                                    maxMonthly) *
                                                                    180 +
                                                                12,
                                                        }}
                                                        title={`Responses: ${m.responses}`}
                                                    />
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    {m.month}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Bottom charts */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            <Card
                                title="Application Sources"
                                subtitle="Where you're finding opportunities"
                            >
                                <div className="space-y-4">
                                    {sources.map((s) => (
                                        <div key={s.label}>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-600">
                                                    {s.label}
                                                </span>
                                                <span className="text-slate-500">
                                                    {s.value}
                                                </span>
                                            </div>
                                            <div className="mt-2 h-3 rounded-full bg-slate-100 overflow-hidden">
                                                <div
                                                    className="h-full bg-teal-500 rounded-full"
                                                    style={{
                                                        width:
                                                            maxSource === 0
                                                                ? "0%"
                                                                : `${(s.value / maxSource) * 100}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Card
                                title="Response Time Distribution"
                                subtitle="How long companies take to respond"
                            >
                                <div className="h-64 rounded-xl border border-slate-200 bg-slate-50 flex items-end justify-around px-6 pb-6">
                                    {responseBins.map((b) => (
                                        <div
                                            key={b.label}
                                            className="flex flex-col items-center gap-2"
                                        >
                                            <div
                                                className="w-10 rounded-lg bg-teal-500"
                                                style={{
                                                    height:
                                                        maxBin === 0
                                                            ? 0
                                                            : (b.value / maxBin) * 180 + 20,
                                                }}
                                                title={`${b.label}: ${b.value}`}
                                            />
                                            <div className="text-xs text-slate-500 text-center w-14 leading-tight">
                                                {b.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
