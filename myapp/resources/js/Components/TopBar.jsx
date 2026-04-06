// resources/js/Components/TopBar.jsx
import React, { useState, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import { FaRegBell } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";

export default function TopBar({ user }) {
    const [notifications, setNotifications] = useState([]);
    const [showBell, setShowBell] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const bellRef = useRef(null);
    const userRef = useRef(null);

    const unreadCount = notifications.filter(n => !n.is_read).length;

    useEffect(() => {
        fetch("/notifications")
            .then(r => r.json())
            .then(setNotifications)
            .catch(console.error);
    }, []);

    // Close dropdowns on outside click
    useEffect(() => {
        const handle = (e) => {
            if (bellRef.current && !bellRef.current.contains(e.target)) setShowBell(false);
            if (userRef.current && !userRef.current.contains(e.target)) setShowUser(false);
        };
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, []);

    const markAsRead = async (id) => {
        await fetch(`/notifications/${id}/read`, { method: "PATCH", headers: { "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content } });
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    };

    const markAllRead = async () => {
        await fetch("/notifications/read-all", { method: "PATCH", headers: { "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content } });
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    };

    return (
        <div className="w-full h-14 bg-white border-b border-gray-200 flex items-center justify-end px-6 gap-4">

            {/* Bell */}
            <div className="relative" ref={bellRef}>
                <button onClick={() => { setShowBell(v => !v); setShowUser(false); }} className="relative p-2 rounded-full hover:bg-gray-100">
                    <FaRegBell className="text-gray-600 w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                            {unreadCount}
                        </span>
                    )}
                </button>

                {showBell && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                        <div className="flex justify-between items-center px-4 py-3 border-b">
                            <span className="font-semibold text-sm text-gray-900">Notifications</span>
                            {unreadCount > 0 && (
                                <button onClick={markAllRead} className="text-xs text-teal-600 hover:underline">
                                    Mark all read
                                </button>
                            )}
                        </div>
                        <div className="max-h-72 overflow-y-auto divide-y">
                            {notifications.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center py-6">No notifications</p>
                            ) : notifications.map(n => (
                                <div
                                    key={n.id}
                                    onClick={() => markAsRead(n.id)}
                                    className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${!n.is_read ? "bg-teal-50" : ""}`}
                                >
                                    <p className="text-sm font-medium text-gray-900">{n.title}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* User dropdown */}
            <div className="relative" ref={userRef}>
                <button onClick={() => { setShowUser(v => !v); setShowBell(false); }} className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100">
                    <VscAccount className="text-gray-600 w-5 h-5" />
                    <span className="text-sm text-gray-700 font-medium">{user?.name ?? "Account"}</span>
                </button>

                {showUser && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                        <button
                            onClick={() => router.visit("/settings")}
                            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-t-xl"
                        >
                            Settings
                        </button>
                        <button
                            onClick={() => router.post("/logout")}
                            className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-b-xl"
                        >
                            Log Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}