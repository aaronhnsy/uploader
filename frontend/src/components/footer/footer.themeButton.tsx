"use client";

import { modesAndColours } from "./footer.themeChanger";
import { clsx } from "clsx";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

interface ThemeButtonProps {
    mode?: string;
    colour?: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function ThemeButton({mode, colour, value, setValue}: ThemeButtonProps) {
    // make sure theme is mounted before rendering
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    // button
    const {theme, setTheme} = useTheme();
    return (
        <button type="button" aria-label="theme switcher"
                className={clsx(
                    mounted && (theme as string).includes(value) ? "h-5 w-10" : "h-5 w-5",
                    "rounded",
                    modesAndColours[value as keyof typeof modesAndColours],
                    "outline", "outline-tertiary",
                    "transitions",
                )}
                onClick={() => {
                    setValue(value);
                    setTheme(mode == undefined ? `${value}-${colour}` : `${mode}-${value}`);
                }}>
        </button>
    );
}
