import React from "react";
import { Link } from "@inertiajs/react";
import {
    FileText,
    ClipboardList,
    Lock,
    BarChart3,
    ShieldCheck,
    Briefcase,
} from "lucide-react";
import logo from "@/Assets/icons/app_icon.png";

export default function Home() {
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="min-h-screen bg-[#dfeff0] text-[#111827]">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full bg-white/95 px-6 py-4 shadow-sm backdrop-blur md:px-12">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#56b7ab] bg-white">
                            <img
                                src={logo}
                                alt="Career-Track Logo"
                                className="h-8 w-8 object-contain"
                            />
                        </div>

                        <h1 className="text-2xl font-bold text-[#009689] md:text-3xl">
                            Career-Track
                        </h1>
                    </div>

                    <nav className="hidden items-center gap-10 text-lg font-medium text-[#4b5563] md:flex">
                        <button
                            type="button"
                            onClick={() => scrollToSection("features")}
                            className="transition hover:text-[#009689]"
                        >
                            Features
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollToSection("about")}
                            className="transition hover:text-[#009689]"
                        >
                            About us
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollToSection("contact")}
                            className="transition hover:text-[#009689]"
                        >
                            Contact
                        </button>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-base font-medium text-[#374151] transition hover:text-[#009689] md:text-lg"
                        >
                            Sign in
                        </Link>

                        <Link
                            href="/register"
                            className="rounded-2xl bg-[#0f9894] px-5 py-3 text-base font-semibold text-white shadow transition hover:bg-[#0b7f7b] md:px-6 md:text-lg"
                        >
                            Join Now
                        </Link>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
                {/* Hero */}
                <section className="text-center">
                    <h2 className="text-4xl font-extrabold text-[#009689] md:text-6xl">
                        Welcome to Career-Track
                    </h2>

                    <p className="mt-6 text-2xl leading-snug text-black md:text-4xl">
                        A tool built for the community,
                        <br />
                        by the community
                    </p>

                    <div className="mt-8">
                        <Link
                            href="/register"
                            className="inline-block rounded-full bg-[#1bb3ba] px-8 py-4 text-xl font-bold text-white shadow transition hover:bg-[#15979d] md:px-16 md:text-3xl"
                        >
                            Take Control of your Career
                        </Link>
                    </div>
                </section>

                {/* Top Feature Cards */}
                <section className="mt-16 grid gap-8 md:grid-cols-3">
                    <div className="relative min-h-[280px] rounded-[2rem] bg-[#4c84ad] p-8 text-white shadow-lg">
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

                    <div className="relative min-h-[280px] rounded-[2rem] bg-[#4c84ad] p-8 text-white shadow-lg">
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

                    <div className="relative min-h-[280px] rounded-[2rem] bg-[#4c84ad] p-8 text-white shadow-lg">
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

                {/* Why Choose Us */}
                <section id="features" className="scroll-mt-28 pt-20">
                    <h2 className="text-center text-4xl font-extrabold text-[#009689]">
                        Why Choose Us?
                    </h2>

                    <div className="mt-12 overflow-hidden rounded-[2rem]">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                            <div className="hidden md:block" />
                            <div className="text-center text-2xl font-extrabold">Price</div>
                            <div className="text-center text-2xl font-extrabold">Privacy</div>
                            <div className="text-center text-2xl font-extrabold">Purpose</div>
                        </div>

                        <div className="mt-6 grid gap-6 md:grid-cols-4">
                            <div className="flex items-center justify-center rounded-[2rem] bg-[#4c84ad] p-8 text-center text-3xl font-extrabold text-white shadow-lg">
                                Career-Track
                            </div>

                            <div className="rounded-[2rem] bg-[#4c84ad] p-8 text-center text-xl font-semibold text-white shadow-lg">
                                All features are free and no limit on applications
                            </div>

                            <div className="rounded-[2rem] bg-[#4c84ad] p-8 text-center text-xl font-semibold text-white shadow-lg">
                                We don’t sell your info,
                                <br />
                                and we only keep
                                <br />
                                the information we need
                            </div>

                            <div className="rounded-[2rem] bg-[#4c84ad] p-8 text-center text-xl font-semibold text-white shadow-lg">
                                Built to help job seekers organize their applications and
                                career
                            </div>
                        </div>

                        <div className="mt-6 grid gap-6 md:grid-cols-4">
                            <div className="flex items-center justify-center rounded-[2rem] bg-[#4c84ad] p-8 text-center text-3xl font-extrabold text-white shadow-lg">
                                Competitors
                            </div>

                            <div className="rounded-[2rem] bg-[#4c84ad] p-8 text-center text-xl font-semibold text-white shadow-lg">
                                Pay for premium features and limit on applications
                            </div>

                            <div className="rounded-[2rem] bg-[#4c84ad] p-8 text-center text-xl font-semibold text-white shadow-lg">
                                Sells data to advertisers
                            </div>

                            <div className="rounded-[2rem] bg-[#4c84ad] p-8 text-center text-xl font-semibold text-white shadow-lg">
                                Built for employers. Collects data on job seekers to
                                research job trends.
                            </div>
                        </div>
                    </div>

                    {/* Optional extra improvement */}
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        <div className="rounded-[1.5rem] bg-white p-6 shadow-md">
                            <BarChart3 className="mb-4 h-10 w-10 text-[#009689]" />
                            <h3 className="text-xl font-bold">Track Progress</h3>
                            <p className="mt-2 text-gray-600">
                                Keep your applications, documents, and outcomes organized in
                                one place.
                            </p>
                        </div>

                        <div className="rounded-[1.5rem] bg-white p-6 shadow-md">
                            <ShieldCheck className="mb-4 h-10 w-10 text-[#009689]" />
                            <h3 className="text-xl font-bold">Respect Privacy</h3>
                            <p className="mt-2 text-gray-600">
                                Your career data should belong to you, not advertisers or
                                third parties.
                            </p>
                        </div>

                        <div className="rounded-[1.5rem] bg-white p-6 shadow-md">
                            <Briefcase className="mb-4 h-10 w-10 text-[#009689]" />
                            <h3 className="text-xl font-bold">Built for Job Seekers</h3>
                            <p className="mt-2 text-gray-600">
                                Designed around the actual workflow of applying, following
                                up, and improving over time.
                            </p>
                        </div>
                    </div>
                </section>

                {/* About */}
                <section id="about" className="scroll-mt-28 pt-24 text-center">
                    <h2 className="text-4xl font-extrabold text-[#009689]">About Us</h2>

                    <p className="mx-auto mt-6 max-w-4xl text-2xl leading-relaxed md:text-4xl">
                        Career-Track is built by a group of developers tired of
                        constantly creating new resumes, cover letters, and applications
                        for jobs that never get back to you.
                    </p>
                </section>

                {/* Mission */}
                <section className="pt-24 text-center">
                    <h2 className="text-4xl font-extrabold text-[#009689]">
                        We Have One Mission
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-2xl leading-relaxed md:text-4xl">
                        Give the community tools to succeed.
                    </p>
                </section>

                {/* Contact */}
                <section id="contact" className="scroll-mt-28 pt-28 pb-20 text-center">
                    <h2 className="text-4xl font-extrabold text-[#009689]">
                        Contact Us
                    </h2>

                    <div className="mt-16">
                        <p className="text-2xl leading-relaxed md:text-4xl">
                            Have Questions or Concerns?
                            <br />
                            Let Us Know!
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-2xl md:text-3xl">
                            <Link
                                href="/login"
                                className="font-bold underline transition hover:text-[#009689]"
                            >
                                Sign In
                            </Link>

                            <span>or</span>

                            <Link
                                href="/register"
                                className="rounded-2xl bg-[#0f9894] px-6 py-3 text-xl font-semibold text-white shadow transition hover:bg-[#0b7f7b] md:text-2xl"
                            >
                                Join Now
                            </Link>

                            <span>to leave us a message</span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}