"use client";

import ThemeButton from "@/src/components/footer/themeButton";
import { useTheme } from "next-themes";
import React, { useState } from "react";

export const modes = {
    "light": "bg-gray-200",
    "dark": "bg-gray-800",
};
export const colours = {
    "red": "bg-rose-500",
    "orange": "bg-orange-500",
    "yellow": "bg-yellow-500",
    "green": "bg-green-500",
    "blue": "bg-blue-500",
    "purple": "bg-violet-500",
};
export const modesAndColours = {
    ...modes,
    ...colours,
};
export const themes =
    Object.keys(modes).map(
        (mode) => Object.keys(colours).map(
            (colour) => `${mode}-${colour}`,
        ),
    ).flat();

export function ThemeChanger() {
    // states
    const {theme} = useTheme();
    const [mode, setMode] = useState(theme?.split("-")[0] ?? "dark");
    const [colour, setColour] = useState(theme?.split("-")[1] ?? "yellow");
    // buttons
    return (
        <div className="space-y-2">
            <div className="flex flex-wrap flex-row-reverse gap-3 p-2 rounded bg-gray-800">
                {Object.keys(modes).map(
                    (key) => (<ThemeButton colour={colour} value={key} setValue={setMode} key={key}/>),
                )}
            </div>
            <div className="flex flex-wrap flex-row-reverse gap-3 p-2 rounded bg-gray-800">
                {Object.keys(colours).map(
                    (key) => (<ThemeButton mode={mode} value={key} setValue={setColour} key={key}/>),
                )}
            </div>
        </div>
    );
}
