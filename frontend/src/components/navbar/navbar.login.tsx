import { clsx } from "clsx";
import Link from "next/link";
import React from "react";

export function NavbarLogin() {
    return (
        <Link href={"/login"}
              className={clsx(
                  "c-button",
                  "py-2", "px-3",
                  "font-bold", "text-sm",
                  "text-gray-900", "hover:text-gray-950",
                  "bg-colour-accent-primary", "hover:bg-colour-accent-secondary",
                  "u-ring-primary", "u-transition",
              )}>
            <p>Login</p>
        </Link>
    );
}
