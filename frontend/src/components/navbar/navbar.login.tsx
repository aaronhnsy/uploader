import { clsx } from "clsx";
import Link from "next/link";
import React from "react";

export function NavbarLogin() {
    return (
        <Link href={"/login"}
              className={clsx(
                  "inline-flex", "items-center", "justify-center",
                  "h-10", "px-2", "rounded",
                  "font-bold", "text-sm", "text-gray-900",
                  "bg-yellow-400", "hover:bg-yellow-600",
                  "dark:bg-yellow-400", "dark:hover:bg-yellow-600",
                  "focus:outline-none", "focus:ring", "focus:ring-gray-900 dark:focus:ring-gray-100",
                  "transition-colors", "duration-300", "ease-in-out",
              )}>
            Log In
        </Link>
    );
}
