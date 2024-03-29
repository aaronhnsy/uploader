import { Theme } from "@/app/theme";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "@/styles/global.css";
import { clsx } from "clsx";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Uploader",
    description: "Upload, view, and share files with Uploader",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning className={inter.variable} lang="en">
        <body className={clsx("bg-theme-primary", "u-transition")}>
        <Theme>
            <div className={clsx(
                "container",
                "flex", "flex-col",
                "min-h-dvh", "mx-auto", "p-2", "space-y-2",
            )}>
                <Header/>
                {children}
                <Footer/>
            </div>
        </Theme>
        </body>
        </html>
    );
}
