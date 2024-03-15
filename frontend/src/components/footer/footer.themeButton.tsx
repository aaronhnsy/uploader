"use client";

import { clsx } from "clsx";
import { modes, accents } from "../../../tailwind.colours";

interface FooterThemeButtonProps {
    option: string;
    values: typeof modes.dark | typeof accents.red;
}

export function FooterThemeButton({ option, values }: FooterThemeButtonProps) {
    return (
        <button type="button" key={option}
                className={clsx(
                    "flex", "items-center", "justify-center", "rounded",
                    "w-4", "h-4", `bg-[${values?.primary}]`, "bg-theme-primary"
                )}>
        </button>
    );
}
