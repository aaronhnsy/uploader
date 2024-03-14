import { Providers } from "@/app/providers";
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
    description: "Uploader",
};

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning className={inter.variable} lang="en">
            <body className={clsx("bg-theme-primary", "u-transition")}>
                <Providers>
                    <div className={clsx(
                        "container",
                        "flex", "flex-col",
                        "min-h-dvh", "mx-auto", "p-3", "space-y-3",
                    )}>
                        <Header/>
                        {children}
                        <Footer/>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
