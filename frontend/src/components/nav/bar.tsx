"use client";

import { NavLink } from "@/src/components/nav/link";
import { clsx } from "clsx";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import { darkModeIcon, lightModeIcon, logoIcon, navbarExpandedIcon, navbarExpandIcon } from "./icons";

export function NavBar() {
    ////////////
    // theme  //
    ////////////
    const {theme, setTheme} = useTheme();
    const themeButton = (
        <button type="button"
                className={clsx(
                    "inline-flex", "items-center", "justify-center",
                    "h-10", "w-10", "rounded",
                    "bg-gray-900", "hover:bg-gray-700",
                    "dark:bg-transparent", "dark:hover:bg-gray-700",
                    "focus:outline-none", "focus:ring", "focus:ring-yellow-500 dark:focus-ring-yellow-400",
                    "theme-transition",
                )}
                onClick={() => (theme === "dark") ? setTheme("light") : setTheme("dark")}>
            {(theme === "dark") ? lightModeIcon : darkModeIcon}
        </button>
    );
    ////////////
    // expand //
    ////////////
    const [isExpanded, setIsExpanded] = useState(false);
    const expandButton = (
        <button type="button"
                className={clsx(
                    "inline-flex", "items-center", "justify-center",
                    "h-10", "w-10", "rounded",
                    "bg-gray-900", "hover:bg-gray-700",
                    "dark:bg-transparent", "dark:hover:bg-gray-700",
                    "focus:outline-none", "focus:ring", "focus:ring-yellow-500 dark:focus-ring-yellow-400",
                    "theme-transition",
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
            {/* logo */}
            <Link href={"/"}
                  className={clsx(
                      "inline-flex", "items-center", "justify-center",
                      "h-10", "px-2", "space-x-2", "rounded",
                      "bg-gray-900", "hover:bg-gray-700",
                      "dark:bg-transparent", "dark:hover:bg-gray-700",
                      "focus:outline-none", "focus:ring", "focus:ring-yellow-500 dark:focus-ring-yellow-400",
                      "theme-transition",
                  )}>
                {logoIcon}
                <h1 className="font-bold text-gray-100">Uploader</h1>
            </Link>

            {/* buttons */}
            <div className="flex items-center justify-center space-x-2 sm:order-2">
                <Link href={"/login"}
                      className={clsx(
                          "inline-flex", "items-center", "justify-center",
                          "h-10", "px-2", "rounded",
                          "font-bold", "text-sm", "text-gray-900",
                          "bg-yellow-400", "hover:bg-yellow-600",
                          "dark:bg-yellow-400", "dark:hover:bg-yellow-600",
                          "focus:outline-none", "focus:ring", "focus:ring-gray-900 dark:focus:ring-gray-100",
                          "theme-transition",
                      )}>
                    Sign In
                </Link>
                {themeButton}
                {expandButton}
            </div>

            {/* links */}
            <div className={`mt-2 sm:mt-0 w-full sm:w-auto ${isExpanded ? "" : "hidden"} sm:block sm:order-1`}>
                <ul className="flex flex-col sm:flex-row p-1 sm:p-0 sm:space-x-6 rounded bg-gray-900 sm:bg-transparent dark:bg-gray-800 dark:sm:bg-transparent theme-transition sm:transition-none">
                    <NavLink href={"/"} text="Home"></NavLink>
                    <NavLink href={"/files"} text="Files"></NavLink>
                </ul>
            </div>
        </nav>
    );
}
