"use client";

import { clsx } from "clsx";
import React, { useState } from "react";
import { NavbarLink } from "./navbar.link";
import { NavbarLogin } from "./navbar.login";
import { NavbarLogo } from "./navbar.logo";
import { NavbarThemeSwitcher } from "./navbar.themeSwitcher";

const navbarExpandIcon = (
    <svg className="h-6 w-6 fill-gray-100"
         viewBox="0 0 24 24"
         fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0
                 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75
                 0 010 1.5H3.75a.75.75 0 01-.75-.75z"/>
    </svg>
);
const navbarExpandedIcon = (
    <svg className="h-6 w-6 fill-gray-100"
         viewBox="0 0 24 24"
         fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0
                 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75
                 0 010 1.5H12a.75.75 0 01-.75-.75z"/>
    </svg>
);

export function Navbar() {
    ////////////
    // expand //
    ////////////
    const [isExpanded, setIsExpanded] = useState(false);
    const expandButton = (
        <button type="button" aria-label="Expand Navbar"
                className={clsx(
                    "inline-flex", "items-center", "justify-center",
                    "h-10", "w-10", "rounded",
                    "bg-gray-900", "hover:bg-gray-700",
                    "dark:bg-transparent", "dark:hover:bg-gray-700",
                    "focus:outline-none", "focus:ring", "focus:ring-yellow-500 dark:focus-ring-yellow-400",
                    "transition-colors", "duration-300", "ease-in-out",
                    "sm:hidden",
                )}
                onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? navbarExpandedIcon : navbarExpandIcon}
        </button>
    );
    ////////////
    // navbar //
    ////////////
    return (
        <nav className="flex flex-wrap items-center justify-between mb-2">
            <NavbarLogo></NavbarLogo>
            {/* buttons */}
            <div className="flex items-center justify-center space-x-2 sm:order-2">
                <NavbarLogin></NavbarLogin>
                <NavbarThemeSwitcher></NavbarThemeSwitcher>
                {expandButton}
            </div>
            {/* links */}
            <div className={`mt-2 sm:mt-0 w-full sm:w-auto ${isExpanded ? "" : "hidden"} sm:block sm:order-1`}>
                <ul className="flex flex-col sm:flex-row p-1 sm:p-0 sm:space-x-5 rounded bg-gray-900 sm:bg-transparent dark:bg-gray-800 dark:sm:bg-transparent transition-colors duration-300 ease-in-out sm:transition-none">
                    <NavbarLink href={"/"} text="Home"></NavbarLink>
                    <NavbarLink href={"/files"} text="Files"></NavbarLink>
                </ul>
            </div>
        </nav>
    );
}
