"use client";

import { ThemeProvider } from "next-themes";
import React from "react";
import { themeNames } from "../../tailwind.colours";

export function Theme({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider themes={themeNames} defaultTheme="system">
            {children}
        </ThemeProvider>
    );
}
