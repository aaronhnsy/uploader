"use client";

import { themeNames } from "@/utilities/colours";
import { ThemeProvider } from "next-themes";
import React from "react";

export function Theme({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider themes={themeNames} defaultTheme="dark-yellow">
            {children}
        </ThemeProvider>
    );
}
