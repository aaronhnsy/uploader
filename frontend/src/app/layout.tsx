import { Providers } from "@/src/app/providers";
import { Navbar } from "@/src/components/navbar";
import "@/src/styles/global.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

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
            <body className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ease-in-out">
                <Providers>
                    <div className="container mx-auto p-3">
                        <Navbar/>
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
