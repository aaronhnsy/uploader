"use client";

import { clsx } from "clsx";
import React, { useState } from "react";
import { NavbarLink } from "./navbar.link";
import { NavbarLogin } from "./navbar.login";
import { NavbarLogo } from "./navbar.logo";

const navbarExpandIcon = (
    <svg className="h-6 w-6"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0
                 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75
                 0 010 1.5H3.75a.75.75 0 01-.75-.75z"/>
    </svg>
);
const navbarExpandedIcon = (
    <svg className="h-6 w-6"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0
                 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75
                 0 010 1.5H12a.75.75 0 01-.75-.75z"/>
    </svg>
);

export function Navbar() {
    ///////////////////
    // expand button //
    ///////////////////
    const [isExpanded, setIsExpanded] = useState(false);
    const expandButton = (
        <button type="button" aria-label="expand navbar"
                className={clsx(
                    "inline-flex", "items-center", "justify-center", "sm:hidden",
                    "w-10", "h-10", "rounded",
                    "bg-gray-900", "hover:bg-gray-950",
                    "fill-accent", "hover:fill-accent-hover",
                    "focus:outline-none", "focus:ring", "focus:ring-accent", "focus:ring-3",
                    "theme-transition",
                )}
                onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? navbarExpandedIcon : navbarExpandIcon}
        </button>
    );
    ////////////
    // navbar //
    ////////////
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
                    "p-1", "sm:p-0", "sm:space-x-5", "rounded",
                    "bg-gray-900", "sm:bg-transparent",
                    "theme-transition", "sm:transition-none",
                )}>
                    <NavbarLink href={"/"} text="Home"></NavbarLink>
                    <NavbarLink href={"/files"} text="Files"></NavbarLink>
                    <NavbarLink href={"/compare"} text="Compare"></NavbarLink>
                </ul>
            </div>
        </nav>
    );
}
