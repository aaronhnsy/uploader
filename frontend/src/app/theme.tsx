"use client";

import { accentOptions } from "@/utilities/colours";
import { ThemeProvider } from "next-themes";
import React from "react";

export function Theme({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider themes={Object.keys(accentOptions)} defaultTheme="dark-yellow">
            {children}
        </ThemeProvider>
    );
}
