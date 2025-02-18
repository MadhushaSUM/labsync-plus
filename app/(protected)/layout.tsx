"use client";

import "antd/dist/reset.css";
import { Button, ConfigProvider, Layout, Menu, theme, MenuProps } from "antd";
import { useState, useEffect } from "react";
import React from 'react';
import { AuditOutlined, FolderOpenOutlined, HomeOutlined, LineChartOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PrinterOutlined, SettingOutlined, UserOutlined, } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumb/BreadcrumbService";
import { Toaster } from "sonner";
import UserAvatar from "@/components/custom-ui/UserPopOver";
import { useCurrentUser } from "@/hooks/api/auth/useCurrentUser";
// import Image from "next/image";

const { Header, Content, Sider } = Layout;

function getSiderItems(isAdmin: boolean) {
    const siderItems: MenuProps['items'] = [
        {
            key: "/dashboard",
            icon: React.createElement(HomeOutlined),
            label: "Home",
        },
        {
            key: "/registrations",
            icon: React.createElement(FolderOpenOutlined),
            label: "Registrations",
        },
        {
            key: "/reports",
            icon: React.createElement(PrinterOutlined),
            label: "Reports",
        },
        {
            key: "/patients",
            icon: React.createElement(UserOutlined),
            label: "Patients",
        },
        {
            key: "/doctors",
            icon: React.createElement(UserOutlined),
            label: "Doctors",
        },
        {
            key: "/audit-trail",
            icon: React.createElement(AuditOutlined),
            label: "Audit trail",
            disabled: !isAdmin,
        },
        {
            key: "/analysis",
            icon: React.createElement(LineChartOutlined),
            label: "Analysis",
            disabled: !isAdmin,

            children: [
                {
                    key: "/analysis/investigation-analysis",
                    label: "Investigation"
                },
                {
                    key: "/analysis/patient-analysis",
                    label: "Patient"
                },
                {
                    key: "/analysis/financial-analysis",
                    label: "Financial"
                },
            ]
        },
        {
            key: "/settings",
            icon: React.createElement(SettingOutlined),
            label: "Settings",
            disabled: !isAdmin,
            children: [
                {
                    key: "/settings/investigations",
                    label: "Investigations"
                },
                {
                    key: "/settings/normal-ranges",
                    label: "Normal Ranges"
                },
                {
                    key: "/settings/users",
                    label: "Users"
                },
                {
                    key: "/settings/branches",
                    label: "Branches"
                },
                {
                    key: "/settings/whatsapp",
                    label: "WhatsApp"
                },
            ]
        },
    ];

    return siderItems;
}

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") setIsDarkMode(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const siderStyle: React.CSSProperties = {
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarGutter: 'stable',
        background: colorBgContainer
    };

    const navigateToKey = (key: string) => {
        router.push(key);
    }

    const currentUser = useCurrentUser();

    return (
        <div>
            <ConfigProvider theme={{ algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
                <Toaster richColors position="top-right" theme={isDarkMode ? "dark" : "light"} />
                <Layout>
                    <Header
                        style={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            background: isDarkMode ? undefined : colorBgContainer,
                        }}
                    >
                        <div className="flex flex-row content-center items-center justify-between w-full h-full">
                            <h1 className="text-lg font-black text-cyan-400 ring-1 rounded-lg px-2 py-1 ring-cyan-300">
                                LabSync - Plus
                            </h1>
                            {/* <div>
                                <Image
                                    src="/LabSync-Plus_logo_wide.png"
                                    width={100}
                                    height={100}
                                    alt="labsync - plus banner"
                                />
                            </div> */}
                            <div className="flex flex-row gap-2 justify-center content-center items-center">
                                <UserAvatar
                                    isDarkMode={isDarkMode}
                                    toggleTheme={toggleTheme}
                                />
                            </div>
                        </div>
                    </Header>
                    <Layout>
                        <Sider width={200} style={siderStyle} collapsible collapsed={collapsed} trigger={null} >
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                                onClick={({ key }) => navigateToKey(key)}
                                items={getSiderItems(currentUser?.role == "admin")}
                            />
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <div className="flex flex-row items-center">
                                <Button
                                    type="text"
                                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        fontSize: '16px',
                                        width: 64,
                                        height: 64,
                                    }}
                                />
                                <Breadcrumbs />
                            </div>
                            <Content
                                style={{
                                    padding: 24,
                                    paddingTop: 0,
                                    margin: 0,
                                    minHeight: 280,
                                    borderRadius: borderRadiusLG,
                                }}
                            >
                                {children}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </ConfigProvider>
        </div>
    );
}
