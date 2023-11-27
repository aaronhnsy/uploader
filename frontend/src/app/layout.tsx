import { Providers } from "@/src/app/providers";
import { Footer } from "@/src/components/footer";
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
};

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning className={inter.variable} lang="en">
        <body className="bg-background transitions">
        <Providers>
            <div className="container mx-auto p-4 space-y-4">
                <Navbar/>
                {children}
                <Footer/>
            </div>
        </Providers>
        </body>
        </html>
    );
}
