
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import QueryProviders from "@/context/QueryProvider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "LabSync - Plus",
    description: "Your laboratory management software",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider session={session}>
                    <AntdRegistry>
                        <QueryProviders>
                            {children}
                        </QueryProviders>
                    </AntdRegistry>
                </SessionProvider>
            </body>
        </html>
    );
}
