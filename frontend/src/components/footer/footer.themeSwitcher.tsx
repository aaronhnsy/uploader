"use client";

import { accentOptions, modeOptions } from "@/utilities/colours";
import { clsx } from "clsx";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

interface FooterThemeSwitcherContainerProps {
    options: Record<string, string>;
    mode?: string;
    accent?: string;
    state: string
    setState: React.Dispatch<React.SetStateAction<string>>;
}

const icon = (
    <svg className={clsx("w-3", "h-3")}
         viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3
                 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244
                 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
    </svg>
);

export function FooterThemeSwitcherContainer({ options, mode, accent, state, setState }: FooterThemeSwitcherContainerProps) {
    // make sure the component is mounted before rendering certain elements
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    // theme switcher
    const { setTheme } = useTheme();
    return (
        <div className={clsx(
            "flex", "flex-wrap", "items-center", "justify-end", "rounded",
            "p-2", "space-x-2",
            "bg-theme-tertiary", "u-transition",
        )}>
            {Object.entries(options).map(
                ([option, value]) => (
                    <button type="button" aria-label="theme-switcher" key={option}
                            className={clsx(
                                "flex", "items-center", "justify-center", "rounded",
                                "w-5", "h-5", "hover:active:scale-105",
                                value, "u-transition",
                            )}
                            onClick={() => {
                                setState(option);
                                setTheme(mode === undefined ? `${option}-${accent}` : `${mode}-${option}`);
                            }}>
                        {mounted && state === option ? icon : null}
                    </button>
                ),
            )}
        </div>
    );
}

export function FooterThemeSwitcher() {
    const { theme } = useTheme();
    const [mode, setMode] = useState(theme?.split("-")[0] ?? "dark");
    const [accent, setAccent] = useState(theme?.split("-")[1] ?? "yellow");
    return (
        <>
            <FooterThemeSwitcherContainer options={modeOptions} accent={accent} state={mode} setState={setMode}/>
            <FooterThemeSwitcherContainer options={accentOptions} mode={mode} state={accent} setState={setAccent}/>
        </>
    );
}
