"use client";

import { clsx } from "clsx";
import { useState } from "react";
import { navbarExpandedIcon, navbarExpandIcon } from "./navbar.icons";
import { NavbarLink } from "./navbar.link";
import { NavbarLogin } from "./navbar.login";
import { NavbarLogo } from "./navbar.logo";

export function Navbar() {
    // expand button
    const [isExpanded, setIsExpanded] = useState(false);
    const expandButton = (
        <button type="button" aria-label="expand navbar"
                className={clsx(
                    "c-button", "w-10", "h-10", "sm:hidden",
                    "bg-colour-primary", "hover:bg-colour-secondary",
                    "fill-colour-accent-primary", "hover:fill-colour-accent-secondary",
                    "u-ring-accent", "u-transition",
                )}
                onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? navbarExpandedIcon : navbarExpandIcon}
        </button>
    );
    // navbar
    return (
        <nav className={clsx("flex", "flex-wrap", "items-center", "justify-between")}>
            <NavbarLogo></NavbarLogo>
            <div className={clsx("flex", "space-x-2", "sm:order-2")}>
                <NavbarLogin></NavbarLogin>
                {expandButton}
            </div>
            <div className={clsx(
                "mt-2", "sm:mt-0",
                "w-full", "sm:w-auto",
                "sm:block", "sm:order-1",
                isExpanded ? "" : "hidden",
            )}>
                <ul className={clsx(
                    "flex", "flex-col", "sm:flex-row",
                    "p-1", "sm:p-0", "space-y-1", "sm:space-y-0", "sm:space-x-5",
                    "rounded",
                    "bg-colour-primary", "sm:bg-transparent",
                    "u-transition", "sm:transition-none",
                )}>
                    <NavbarLink href={"/"} text="Home"></NavbarLink>
                    <NavbarLink href={"/files"} text="Files"></NavbarLink>
                    <NavbarLink href={"/ranker"} text="Ranker"></NavbarLink>
                </ul>
            </div>
        </nav>
    );
}
