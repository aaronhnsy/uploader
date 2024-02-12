"use client";

import { clsx } from "clsx";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { modesAndColours } from "./footer.themeChanger";

interface ThemeButtonProps {
    mode?: string;
    colour?: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const icon = (
    <svg className="h-3 w-3"
         viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3
                 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244
                 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
    </svg>
);

export default function ThemeButton({mode, colour, value, setValue}: ThemeButtonProps) {
    // make sure the theme is mounted before rendering
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    // button
    const {theme, setTheme} = useTheme();
    return (
        <button type="button" aria-label="theme switcher"
                className={clsx(
                    "c-button", "h-5", "w-5",
                    modesAndColours[value as keyof typeof modesAndColours],
                    "focus:outline-none", "ring", "ring-colour-tertiary",
                    "u-transition",
                )}
                onClick={() => {
                    setValue(value);
                    setTheme(mode == undefined ? `${value}-${colour}` : `${mode}-${value}`);
                }}>
            {mounted && (theme as string).includes(value) ? icon : ""}
        </button>
    );
}
