"use client";

import { clsx } from "clsx";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import ThemeButton from "./footer.themeButton";
import { themes } from "../../../tailwind.colours";

let modes: {[key: string]: any} = {}
let accents: {[key: string]: any} = {}

for (const mode in themes) {
    if (typeof themes[mode] === "object") {
        for (const accent in themes[mode]) {
            accents[accent] = themes[mode][accent]
        }
    }
    else {
        modes[mode] = themes[mode].primary
    }
}

export function ThemeChanger() {
    // states
    const {theme} = useTheme();
    const [mode, setMode] = useState(theme?.split("-")[0] ?? "dark");
    const [colour, setColour] = useState(theme?.split("-")[1] ?? "yellow");
    // buttons
    return (
        <div className={clsx("space-y-2")}>
            <div
                className={clsx("flex", "flex-wrap", "flex-row-reverse", "gap-2", "p-2", "rounded", "bg-theme-tertiary", "u-transition")}>
                {Object.keys(modes).map(
                    (key) => (<ThemeButton colour={colour} value={key} setValue={setMode} key={key}/>),
                )}
            </div>
            <div
                className={clsx("flex", "flex-wrap", "flex-row-reverse", "gap-2", "p-2", "rounded", "bg-theme-tertiary", "u-transition")}>
                {Object.keys(colours).map(
                    (key) => (<ThemeButton mode={mode} value={key} setValue={setColour} key={key}/>),
                )}
            </div>
        </div>
    );
}
