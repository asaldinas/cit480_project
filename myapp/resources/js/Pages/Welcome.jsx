import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowUpRight, FileText, ClipboardList, Lock } from "lucide-react";
import logo from '@/Assets/icons/app_icon.png';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#dfeff0]">
            {/* Header */}
            <header className="w-full bg-white px-6 md:px-12 py-4 shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-14 w-14 rounded-full border-4 border-[#56b7ab] flex items-center justify-center bg-white">
                            <img
                                src={logo}
                                alt="Career-Track Logo"
                                className="h-8 w-8 object-contain"
                            />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#009689]">
                            Career-Track
                        </h1>
                    </div>

                    <nav className="hidden md:flex items-center gap-10 text-[#4b5563] text-xl font-medium">
                        <a href="#" className="hover:text-[#009689] transition">
                            Features
                        </a>
                        <a href="#" className="hover:text-[#009689] transition">
                            About us
                        </a>
                        <a href="#" className="hover:text-[#009689] transition">
                            Contact
                        </a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-[#374151] text-lg font-medium hover:text-[#009689] transition"
                        >
                            Sign in
                        </Link>

                        <Link
                            href="/register"
                            className="rounded-2xl bg-[#0f9894] px-6 py-3 text-lg font-semibold text-white shadow hover:bg-[#0b7f7b] transition"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <main className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
                <section className="text-center">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-[#009689]">
                        Welcome to Career-Track
                    </h2>

                    <p className="mt-6 text-2xl md:text-4xl leading-snug text-black">
                        A tool built for the community,
                        <br />
                        by the community
                    </p>

                    <div className="mt-8">
                        <Link
                            href="/register"
                            className="inline-block rounded-full bg-[#1bb3ba] px-8 md:px-16 py-4 text-2xl md:text-4xl font-bold text-white shadow hover:bg-[#15979d] transition"
                        >
                            Take Control of your Career
                        </Link>
                    </div>
                </section>

                {/* Feature Cards */}
                <section className="mt-16 grid gap-8 md:grid-cols-3">
                    <div className="relative rounded-[2rem] bg-[#4c84ad] p-8 text-white shadow-lg min-h-[295px]">
                        <h3 className="text-3xl font-extrabold">Free &amp; Functional</h3>
                        <p className="mt-4 max-w-[260px] text-xl leading-relaxed">
                            The only free tool you will ever need to apply to jobs.
                        </p>

                        <FileText
                            size={92}
                            className="absolute bottom-6 right-6 text-[#d9d2c2]"
                            strokeWidth={1.8}
                        />
                    </div>

                    <div className="relative rounded-[2rem] bg-[#4c84ad] p-8 text-white shadow-lg min-h-[295px]">
                        <h3 className="text-3xl font-extrabold">Analytics</h3>
                        <p className="mt-4 max-w-[260px] text-xl leading-relaxed">
                            View statistics and insights on your career journey.
                        </p>

                        <ClipboardList
                            size={92}
                            className="absolute bottom-6 right-6 text-[#e6d9c3]"
                            strokeWidth={1.8}
                        />
                    </div>

                    <div className="relative rounded-[2rem] bg-[#4c84ad] p-8 text-white shadow-lg min-h-[295px]">
                        <h3 className="text-3xl font-extrabold">Privacy is Priority</h3>
                        <p className="mt-4 max-w-[280px] text-xl leading-relaxed">
                            Your documents and contact information is yours. We do not
                            sell user information.
                        </p>

                        <Lock
                            size={92}
                            className="absolute bottom-6 right-6 text-[#f4c542]"
                            strokeWidth={1.8}
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}