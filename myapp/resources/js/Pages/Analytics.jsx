import React, { useMemo } from "react";
import DashboardSidebar from "@/Components/DashboardSidebar";
import { usePage } from "@inertiajs/react";
import TopBar from "@/Components/TopBar";

function StatCard({ title, value, subtext }) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">{title}</p>
            <div className="mt-3 text-3xl font-semibold text-slate-900">{value}</div>
            {subtext ? <div className="mt-1 text-sm text-teal-700">{subtext}</div> : null}
        </div>
    );
}

function Card({ title, subtitle, children, footer }) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div>
                <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
                {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
            </div>
            <div className="mt-6">{children}</div>
            {footer ? <div className="mt-4">{footer}</div> : null}
        </div>
    );
}

export default function Analytics() {
    const { auth, kpis: rawKpis, responseTypes: rawResponseTypes, monthlyActivity: rawMonthly, applicationSources: rawSources } = usePage().props;

    const kpis = rawKpis ?? {};
    const responseRate = Number(kpis.responseRate ?? 0);
    const responseRateDelta = Number(kpis.responseRateDelta ?? 0);
    const deltaPrefix = responseRateDelta > 0 ? "+" : "";

    // Status donut
    const statusesFromBackend = kpis.statuses ?? [];
    const status = useMemo(() => {
        if (!Array.isArray(statusesFromBackend) || statusesFromBackend.length === 0) {
            return [
                { label: "Submitted", value: 0, color: "#14b8a6" },
                { label: "Responses", value: 0, color: "#3b82f6" },
            ];
        }
        return statusesFromBackend.map((s) => ({ label: s.label ?? s.key, value: Number(s.value ?? 0), color: s.color ?? "#9ca3af" }));
    }, [statusesFromBackend]);

    const statusTotal = useMemo(() => status.reduce((sum, s) => sum + s.value, 0), [status]);

    const donutStyle = useMemo(() => {
        let start = 0;
        const parts = status.map((s) => {
            const pct = statusTotal === 0 ? 0 : (s.value / statusTotal) * 100;
            const end = start + pct;
            const seg = `${s.color} ${start}% ${end}%`;
            start = end;
            return seg;
        });
        return { background: `conic-gradient(${parts.join(", ")})` };
    }, [status, statusTotal]);

    // Response type breakdown
    const responseTypes = useMemo(() => {
        const data = rawResponseTypes ?? [];
        return data.map((r) => ({ label: r.label, value: Number(r.value ?? 0), color: r.color ?? "#9ca3af" }));
    }, [rawResponseTypes]);
    const maxResponseType = useMemo(() => Math.max(1, ...responseTypes.map((r) => r.value)), [responseTypes]);

    // Monthly chart
    const monthly = useMemo(() => {
        const data = rawMonthly ?? [];
        return data.map((m) => ({
            ym:           m.ym ?? m.month,
            month:        m.month ?? "",
            applications: Number(m.applications ?? 0),
            interviews:   Number(m.interviews ?? 0),
            responses:    Number(m.responses ?? 0),
        }));
    }, [rawMonthly]);

    const maxMonthly = useMemo(() => {
        if (!monthly.length) return 1;
        return Math.max(1, ...monthly.map((m) => Math.max(m.applications, m.interviews, m.responses)));
    }, [monthly]);

    // Application sources
    const sources = useMemo(() => {
        const data = rawSources ?? [];
        return data.map((s) => ({ label: s.label ?? "Other", value: Number(s.value ?? 0) }));
    }, [rawSources]);
    const maxSource = useMemo(() => Math.max(1, ...sources.map((s) => s.value)), [sources]);

    return (
        <div className="min-h-screen flex bg-[#e2f4f5] font-sans">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col">
                <TopBar user={auth?.user} />

                <div className="flex-1 flex flex-col">
                    <header className="bg-white border-b border-gray-200 px-6 py-6">
                        <h1 className="text-[32px] font-normal text-slate-900">Analytics</h1>
                        <p className="text-sm text-slate-500">Track your job search progress and performance metrics</p>
                    </header>

                    <main className="flex-1 px-6 py-6 space-y-6">

                        {/* KPI cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <StatCard
                                title="Total Applications"
                                value={kpis.totalApplications ?? 0}
                                subtext={`+${kpis.totalThisWeek ?? 0} this week`}
                            />
                            <StatCard
                                title="Response Rate"
                                value={`${responseRate.toFixed(1)}%`}
                                subtext={`${deltaPrefix}${responseRateDelta.toFixed(1)}% vs last month`}
                            />
                            <StatCard
                                title="Interviews Secured"
                                value={kpis.interviewsSecured ?? 0}
                            />
                            <StatCard
                                title="Accepted"
                                value={kpis.acceptedCount ?? 0}
                            />
                        </div>

                        {/* Status donut + Response breakdown */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <Card title="Application Status" subtitle="Current distribution of your applications">
                                <div className="flex items-center gap-8">
                                    {/* Donut */}
                                    <div className="relative h-48 w-48 shrink-0">
                                        <div className="absolute inset-0 rounded-full" style={donutStyle} />
                                        <div className="absolute inset-6 rounded-full bg-white border border-slate-200" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-xs text-slate-500">Total</div>
                                                <div className="text-xl font-semibold text-slate-900">{statusTotal}</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Legend */}
                                    <div className="space-y-3 flex-1">
                                        {status.map((s) => {
                                            const pct = statusTotal === 0 ? 0 : (s.value / statusTotal) * 100;
                                            return (
                                                <div key={s.label} className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                                                        <span className="text-slate-700">{s.label}</span>
                                                    </div>
                                                    <span className="text-slate-500">{s.value} <span className="text-slate-400">({pct.toFixed(0)}%)</span></span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Card>

                            <Card title="Response Breakdown" subtitle="Outcomes from your submitted applications">
                                <div className="space-y-4">
                                    {responseTypes.map((r) => (
                                        <div key={r.label}>
                                            <div className="flex items-center justify-between text-sm mb-1.5">
                                                <span className="text-slate-600">{r.label}</span>
                                                <span className="text-slate-500">{r.value}</span>
                                            </div>
                                            <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all"
                                                    style={{ width: `${(r.value / maxResponseType) * 100}%`, backgroundColor: r.color }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    {responseTypes.every((r) => r.value === 0) && (
                                        <p className="text-sm text-slate-400">No responses logged yet.</p>
                                    )}
                                </div>
                            </Card>
                        </div>

                        {/* Monthly activity */}
                        <Card
                            title="Applications Over Time"
                            subtitle="Monthly application activity"
                            footer={
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded bg-teal-500" />
                                        <span className="text-slate-600">Applications</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded bg-violet-500" />
                                        <span className="text-slate-600">Interviews</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded bg-blue-500" />
                                        <span className="text-slate-600">Responses</span>
                                    </div>
                                </div>
                            }
                        >
                            <div className="h-64 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
                                <div className="h-full flex items-end justify-between gap-3">
                                    {monthly.map((m) => {
                                        const scale = 180 / maxMonthly;
                                        return (
                                            <div key={m.ym} className="flex-1 flex flex-col items-center gap-2">
                                                <div className="w-full flex items-end justify-center gap-1">
                                                    <div className="w-3 rounded-md bg-teal-500"   style={{ height: m.applications * scale + 4 }} title={`Applications: ${m.applications}`} />
                                                    <div className="w-3 rounded-md bg-violet-500" style={{ height: m.interviews   * scale + 4 }} title={`Interviews: ${m.interviews}`} />
                                                    <div className="w-3 rounded-md bg-blue-500"   style={{ height: m.responses    * scale + 4 }} title={`Responses: ${m.responses}`} />
                                                </div>
                                                <div className="text-xs text-slate-500">{m.month}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </Card>

                        {/* Application sources */}
                        <Card title="Application Sources" subtitle="Where you're finding opportunities">
                            <div className="space-y-4">
                                {sources.map((s) => (
                                    <div key={s.label}>
                                        <div className="flex items-center justify-between text-sm mb-1.5">
                                            <span className="text-slate-600">{s.label}</span>
                                            <span className="text-slate-500">{s.value}</span>
                                        </div>
                                        <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                                            <div
                                                className="h-full bg-teal-500 rounded-full"
                                                style={{ width: `${(s.value / maxSource) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {sources.length === 0 && <p className="text-sm text-slate-400">No applications logged yet.</p>}
                            </div>
                        </Card>

                    </main>
                </div>
            </div>
        </div>
    );
}
