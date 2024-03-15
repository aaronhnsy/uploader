"use client";

import { FooterThemeButton } from "@/components/footer/footer.themeButton";
import { clsx } from "clsx";
import { modes, accents } from "../../../tailwind.colours";

interface ThemeSwitcherProps {
    options: typeof modes | typeof accents;
}

export function FooterThemeSwitcher({ options }: ThemeSwitcherProps) {
    return (
        <div className={clsx(
            "flex", "flex-wrap", "items-center", "justify-end", "rounded",
            "p-2", "space-x-2",
            "bg-theme-tertiary"
        )}>
            {Object.entries(options).map(([option, values]) => (<FooterThemeButton key={option} option={option} values={values}/>))}
        </div>
    );
}
