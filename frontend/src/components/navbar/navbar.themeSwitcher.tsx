"use client";

import { clsx } from "clsx";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const systemModeIcon = (
    <svg className="h-5 w-5 fill-gray-100"
         viewBox="0 0 20 20"
         fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75
              15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501
              3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0
              01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z"/>
    </svg>
);
const lightModeIcon = (
    <svg className="h-5 w-5 fill-gray-100"
         viewBox="0 0 20 20"
         fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0
                 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657
                 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75
                 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75
                 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015
                 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404
                 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z"/>
    </svg>
);
const darkModeIcon = (
    <svg className="h-4 w-4 fill-gray-100"
         viewBox="0 0 20 20"
         fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647
                 1.921a.75.75 0 01.808.083z"/>
    </svg>
);

const icons = {
    system: systemModeIcon,
    light: lightModeIcon,
    dark: darkModeIcon,
};
const themes = Object.keys(icons);

export function NavbarThemeSwitcher() {
    // prevent hydration mismatch errors
    const [isMounted, setIsMounted] = useState(false);
    useEffect(
        () => setIsMounted(true),
        [],
    );
    // theme switcher
    const {theme, setTheme} = useTheme();
    return (
        <button type="button" aria-label="Theme Switcher"
                className={clsx(
                    "inline-flex", "items-center", "justify-center",
                    "h-10", "w-10", "rounded",
                    "bg-gray-900", "hover:bg-gray-700",
                    "dark:bg-transparent", "dark:hover:bg-gray-700",
                    "focus:outline-none", "focus:ring", "focus:ring-yellow-500 dark:focus-ring-yellow-400",
                    "transition-colors", "duration-300", "ease-in-out",
                )}
                onClick={() => setTheme(themes[(themes.indexOf(theme as string) + 1) % themes.length])}>
            {isMounted ? icons[theme as keyof typeof icons] : null}
        </button>
    );
}
