'use client';

import { Toggle } from "./ui/toggle";

interface SidebarProps {
    toggleSidebar: () => void;
    isExpanded: boolean;
    sidebarSize: number;
}

export default function Sidebar({ toggleSidebar, isExpanded, sidebarSize }: SidebarProps) {
    return (
        <div
            className={`transition-all duration-300 ease-in-out`}
            style={{ width: `${sidebarSize}rem` }}
        >
            <Toggle
                onClick={toggleSidebar}
            >
                {isExpanded ? "<<" : ">>"}
            </Toggle>
        </div>
    );
}