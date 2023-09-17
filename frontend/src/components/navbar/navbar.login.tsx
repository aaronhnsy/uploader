import { clsx } from "clsx";
import Link from "next/link";
import React from "react";

export function NavbarLogin() {
    return (
        <Link href={"/login"}
              className={clsx(
                  "inline-flex", "items-center", "justify-center",
                  "h-10", "px-2", "rounded",
                  "font-bold", "text-sm", "text-gray-900", "hover:text-gray-950",
                  "bg-accent", "hover:bg-accent-hover",
                  "focus:outline-none", "focus:ring", "focus:ring-gray-100", "focus:ring-3",
                  "theme-transition",
              )}>
            <p>Login</p>
        </Link>
    );
}
