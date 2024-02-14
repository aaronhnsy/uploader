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
                    "c-button", "h-10", "w-10",
                    "ml-auto", "sm:hidden",
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
        <nav className={clsx("flex", "flex-wrap")}>
            <NavbarLogo></NavbarLogo>
            <NavbarLogin></NavbarLogin>
            {expandButton}
            <div className={clsx(
                "flex-none", "sm:flex-1",
                "mt-3", "sm:mt-0",
                "w-full", "sm:w-auto",
                "sm:block",
                isExpanded ? "" : "hidden",
            )}>
                <ul className={clsx(
                    "flex", "flex-col", "sm:flex-row",
                    "p-1", "sm:p-0", "space-y-1", "sm:space-y-0", "sm:space-x-3",
                    "bg-colour-primary", "sm:bg-transparent", "rounded", "sm:rounded-none",
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
