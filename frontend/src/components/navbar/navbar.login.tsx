import { clsx } from "clsx";
import Link from "next/link";
import React from "react";

export function NavbarLogin() {
    return (
        <Link href={"/login"}
              className={clsx(
                  "inline-flex", "items-center", "justify-center",
                  "py-2", "px-3", "rounded",
                  "font-bold", "text-sm", "text-gray-900", "hover:text-gray-950",
                  "c_bg-accent", "c_ring-primary", "transitions",
              )}>
            <p>Login</p>
        </Link>
    );
}
