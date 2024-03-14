"use client";

import { themes } from "@/components/footer/footer.themeChanger";
import { ThemeProvider } from "next-themes";
import React from "react";

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <ThemeProvider themes={themes} defaultTheme="dark-yellow">
            {children}
        </ThemeProvider>
    );
}
