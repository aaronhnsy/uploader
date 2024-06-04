import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "@/styles/global.css";
import { clsx } from "clsx";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Uploader",
    description: "Upload, view, and share files with Uploader",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning className={inter.className} lang="en">
        <body className={clsx("bg-theme-primary", "text-theme-text", "text-size-7", "transitions")}>
        <ThemeProvider defaultTheme="dark-yellow">
            <div className={clsx(
                "container",
                "flex", "flex-col",
                "mx-auto", "p-2", "min-h-dvh", "space-y-2",
            )}>
                <Header/>
                {children}
                <Footer/>
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}
