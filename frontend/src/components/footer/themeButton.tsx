"use client";

import { modesAndColours } from "@/src/components/footer/themeChanger";
import { clsx } from "clsx";
import { useTheme } from "next-themes";
import React from "react";

interface ThemeButtonProps {
    mode?: string;
    colour?: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function ThemeButton({mode, colour, value, setValue}: ThemeButtonProps) {
    const {setTheme} = useTheme();
    return (
        <button type="button" aria-label="theme switcher"
                className={clsx(
                    "w-6", "h-6", "rounded",
                    modesAndColours[value as keyof typeof modesAndColours],
                )}
                onClick={() => {
                    setValue(value);
                    setTheme(mode == undefined ? `${value}-${colour}` : `${mode}-${value}`);
                }}>
        </button>
    );
}
