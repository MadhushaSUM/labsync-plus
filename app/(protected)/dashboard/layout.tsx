"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const SIDEBAR_EXPANDED_SIZE = 15;
    const SIDEBAR_COLLAPSED_SIZE = 3;

    const [sidebarSize, setSidebarSize] = useState(SIDEBAR_EXPANDED_SIZE);

    const toggleSidebar = () => {
        setSidebarSize(prevSize =>
            prevSize === SIDEBAR_EXPANDED_SIZE ? SIDEBAR_COLLAPSED_SIZE : SIDEBAR_EXPANDED_SIZE
        );
    };

    return (
        <div className="h-screen flex">
            <div className="flex-none transition-all duration-300 ease-in-out bg-blue-400" style={{ width: `${sidebarSize}rem` }}>
                <Sidebar
                    toggleSidebar={toggleSidebar}
                    isExpanded={sidebarSize === SIDEBAR_EXPANDED_SIZE}
                    sidebarSize={sidebarSize}
                />
            </div>
            <div className="flex-grow bg-slate-500">
                {children}
            </div>
        </div>
    );
}
