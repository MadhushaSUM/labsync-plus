"use client";

import React from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const breadcrumbNameMap: { [key: string]: string } = {
    "/": "Home",
    "/dashboard": "Dashboard",
    "/patients": "Patients",
    "/patients/add": "Add",
    "/patients/edit": "Edit",
    "/doctors": "Doctors",
    "/doctors/add": "Add",
    "/doctors/edit": "Edit",
    "/audit-trail": "Audit Trail",
    "/registrations": "Registrations",
    "/registrations/add": "Add",
    "/registrations/edit": "Edit",
    "/settings": "Settings",
    "/settings/investigations": "Investigation settings",
    "/settings/normal-ranges": "Normal Ranges",
    "/reports": "Reports",
};

export default function Breadcrumbs() {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);

    const breadcrumbItems = pathSegments.map((segment, index) => {
        const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
        
        return {
            title: (
                <Link href={url}>
                    {breadcrumbNameMap[url] || segment.replace(/-/g, " ").toUpperCase()}
                </Link>
            ),
        };
    });

    return (
        <Breadcrumb
            items={[
                { title: <Link href="/"><HomeOutlined /> Home</Link> },
                ...breadcrumbItems,
            ]}
            style={{ margin: '16px 0' }}
        />
    );
}
