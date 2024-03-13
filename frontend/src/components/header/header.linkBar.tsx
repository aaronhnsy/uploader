"use client";

import { clsx } from "clsx";
import { useState } from "react";
import { headerLinkBarCollapseIcon, headerLinkBarExpandIcon } from "./header.icons";
import { HeaderLink } from "./header.link";

export function HeaderLinkBar() {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <>
            <button type="button" aria-label="expand header"
                    className={clsx(
                        "c-button", "h-10", "w-10",
                        "ml-auto", "sm:hidden",
                        "bg-theme-secondary", "hover:bg-theme-secondary-hover",
                        "fill-theme-accent", "hover:fill-theme-accent-hover",
                        "u-transition",
                    )}
                    onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? headerLinkBarCollapseIcon : headerLinkBarExpandIcon}
            </button>
            <div className={clsx(
                "flex-none", "sm:flex-1",
                "mt-3", "sm:mt-0",
                "w-full", "sm:w-auto",
                "sm:block", isExpanded ? "" : "hidden",
            )}>
                <ul className={clsx(
                    "flex",
                    "flex-col", "sm:flex-row",
                    "p-1", "sm:p-0",
                    "space-x-0", "sm:space-x-3",
                    "space-y-1", "sm:space-y-0",
                    "bg-theme-secondary", "sm:bg-transparent",
                    "rounded", "sm:rounded-none",
                    "u-transition", "sm:transition-none",
                )}>
                    <HeaderLink href={"/"} text="Home"></HeaderLink>
                    <HeaderLink href={"/files"} text="Files"></HeaderLink>
                </ul>
            </div>
        </>
    );
}
