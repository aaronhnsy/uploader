"use client";

import { clsx } from "clsx";
import { HeaderLinkButton } from "components/header/header.button.link";
import { useState } from "react";

const headerLinksExpandIcon = (
    <svg width="24px" height="24px" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3
                 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3
                 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7
                 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
    </svg>
);
const headerLinksCollapseIcon = (
    <svg width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3
                 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3
                 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7
                 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
    </svg>
);

export function HeaderLinks() {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <>
            <button type="button" aria-label="Expand Header" aria-pressed={isExpanded}
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={clsx(
                        "flex", "items-center", "justify-center", "rounded",
                        "size-10", "ml-auto", "sm:hidden",
                        "bg-colour-secondary", "hover:bg-colour-secondary-hover",
                        "fill-colour-accent", "hover:fill-colour-accent-hover",
                        "transitions",
                    )}>
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
                    "bg-colour-secondary", "sm:bg-transparent",
                    "transitions", "sm:transition-none",
                )}>
                    <HeaderLinkButton href={"/"} text="Home"></HeaderLinkButton>
                    <HeaderLinkButton href={"/uploads"} text="Uploads"></HeaderLinkButton>
                </ul>
            </div>
        </>
    );
}
