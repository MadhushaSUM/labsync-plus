"use client";

import Sidebar from "@/components/Sidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const SIDEBAR_EXPANDED_SIZE = 15;
    const SIDEBAR_COLLAPSED_SIZE = 5;

    const [sidebarSize, setSidebarSize] = useState(SIDEBAR_EXPANDED_SIZE);

    const toggleSidebar = () => {
        setSidebarSize(prevSize =>
            prevSize === SIDEBAR_EXPANDED_SIZE ? SIDEBAR_COLLAPSED_SIZE : SIDEBAR_EXPANDED_SIZE
        );
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="bg-white p-3">
                NavBar
            </div>
            <div className="flex flex-grow mt-2 overflow-hidden">
                <div className="flex-none transition-all duration-300 ease-in-out" style={{ width: `${sidebarSize}rem` }}>
                    <div className="h-full pb-4">
                        <div className="rounded-r-lg bg-white h-full">
                            <Sidebar
                                toggleSidebar={toggleSidebar}
                                isExpanded={sidebarSize === SIDEBAR_EXPANDED_SIZE}
                                sidebarSize={sidebarSize}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex-grow overflow-hidden ml-2">
                    <ScrollArea className="h-full">
                        <div className="h-full pb-4">
                            <div className="mr-4">
                                {children}
                            </div>
                        </div>
                        <ScrollBar className="bg-white" />
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}