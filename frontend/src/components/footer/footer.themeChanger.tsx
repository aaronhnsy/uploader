"use client";

import { clsx } from "clsx";
import { useTheme } from "next-themes";
import React, { useState } from "react";

export const siteThemes = {
    "light": "bg-gray-200 ring ring-gray-900",
    "dark": "bg-gray-800 ring ring-gray-100",
};
export const siteAccents = {
    "red": "bg-rose-500",
    "orange": "bg-orange-500",
    "yellow": "bg-yellow-500",
    "green": "bg-green-500",
    "blue": "bg-blue-500",
    "purple": "bg-violet-500",
};
export const themes = Object.keys(siteThemes).map(
    (siteTheme) => Object.keys(siteAccents).map(
        (siteAccent) => `${siteTheme}-${siteAccent}`,
    ),
).flat();

export function FooterThemeChanger() {
    // states
    const {theme, setTheme} = useTheme();
    const [siteThemeState, setSiteTheme] = useState("light");
    const [siteAccentState, setSiteAccent] = useState("red");
    // buttons
    return (
        <div className="ml-auto space-y-2">
            <div className="p-2 space-x-3 rounded bg-gray-800">
                {Object.keys(siteThemes).map(
                    (siteTheme) => (
                        <button type="button" aria-label="theme switcher" key={siteTheme}
                                className={clsx(
                                    "w-8", "h-8", "rounded",
                                    siteThemes[siteTheme as keyof typeof siteThemes],
                                    // theme?.includes(siteTheme) ? "ring ring-theme-accent" : "",
                                )}
                                onClick={() => {
                                    setSiteTheme(siteTheme);
                                    setTheme(`${siteTheme}-${siteAccentState}`);
                                }}>
                        </button>
                    ),
                )}
            </div>
            <div className="p-2 space-x-3 rounded bg-gray-800">
                {Object.keys(siteAccents).map(
                    (siteAccent) => (
                        <button type="button" aria-label="accent switcher" key={siteAccent}
                                className={clsx(
                                    "w-8", "h-8", "rounded",
                                    siteAccents[siteAccent as keyof typeof siteAccents],
                                    // theme?.includes(siteAccent) ? "ring ring-gray-100" : "",
                                )}
                                onClick={() => {
                                    setSiteAccent(siteAccent);
                                    setTheme(`${siteThemeState}-${siteAccent}`);
                                }}>
                        </button>
                    ),
                )}
            </div>
        </div>
    );
}
