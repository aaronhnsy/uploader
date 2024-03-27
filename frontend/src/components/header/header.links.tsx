"use client";

import { clsx } from "clsx";
import { useState } from "react";
import { HeaderLinkButton } from "components/header/header.button.link";

const headerLinksExpandIcon = (
    <svg className={clsx("w-6", "h-6")} width="24px" height="24px"
         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013
                 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0
                 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75
                 0 01-.75-.75z"/>
    </svg>
);
const headerLinksCollapseIcon = (
    <svg className={clsx("w-7", "h-7")} width="28px" height="28px"
         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013
                 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0
                 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75
                 0 01-.75-.75z"/>
    </svg>
);

export function HeaderLinks() {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <>
            <button type="button" aria-label="Expand Header" aria-pressed={isExpanded} className={clsx(
                "flex", "items-center", "justify-center", "rounded",
                "h-10", "w-10", "ml-auto", "sm:hidden",
                "bg-theme-secondary", "hover:bg-theme-secondary-hover",
                "fill-theme-accent", "hover:fill-theme-accent-hover",
                "u-transition",
            )} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? headerLinksCollapseIcon : headerLinksExpandIcon}
            </button>
            <div className={clsx(
                "flex-none", "sm:flex-1",
                "mt-2", "sm:mt-0",
                "w-full", "sm:w-auto",
                "sm:block", isExpanded ? "" : "hidden",
            )}>
                <ul className={clsx(
                    "flex",
                    "flex-col", "sm:flex-row",
                    "p-1", "sm:p-0",
                    "space-x-0", "sm:space-x-2",
                    "space-y-1", "sm:space-y-0",
                    "rounded", "sm:rounded-none",
                    "bg-theme-secondary", "sm:bg-transparent",
                    "u-transition", "sm:transition-none",
                )}>
                    <HeaderLinkButton href={"/"} text="Home"></HeaderLinkButton>
                    <HeaderLinkButton href={"/files"} text="Files"></HeaderLinkButton>
                </ul>
            </div>
        </>
    );
}
