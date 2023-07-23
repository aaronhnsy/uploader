import Providers from "@/src/app/providers";
import "@/src/styles/global.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { NavBar } from "../components/nav";

const inter = Inter(
    {
        subsets: ["latin"],
        variable: "--font-inter",
    },
);

export const metadata: Metadata = {
    title: "Uploader",
    description: "Uploader",
    viewport: {width: "device-width", initialScale: 1},
};

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning className={inter.variable} lang="en">
            <body className="bg-gray-100 dark:bg-gray-900 theme-transition">
                <Providers>
                    <div className="container mx-auto p-3">
                        <NavBar/>
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
