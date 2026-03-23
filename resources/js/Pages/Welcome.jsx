import React from "react";
import { Link } from "@inertiajs/react";

export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#e2f4f5]">
            <div className="bg-white p-10 rounded-xl shadow-lg text-center">
                <h1 className="text-4xl font-bold mb-4 text-[#009689]">
                    Welcome to Career-Track
                </h1>

                <p className="text-gray-600 mb-6">
                    Your personal job application manager.
                </p>

                <div className="flex justify-center gap-4">
                    <Link 
                        href="/login" 
                        className="px-4 py-2 bg-[#009689] text-white rounded-lg hover:bg-[#00786f]"
                    >
                        Login
                    </Link>

                    <Link 
                        href="/register" 
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}
