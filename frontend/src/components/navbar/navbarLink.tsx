"use client";

import { clsx } from "clsx";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export function NavbarLink({href, text}: { href: LinkProps<typeof Link>["href"], text: string }) {
    return (
        <Link
            className={
                clsx(
                    "p-2", "sm:p-0", "rounded",
                    "font-medium", "text-sm",
                    (
                        (usePathname() === href)
                            ? "text-yellow-400 underline"
                            : "text-white"
                    ),
                    "hover:bg-gray-700 sm:hover:bg-transparent",
                )
            }
            href={href}
        >
            {text}
        </Link>
    );
}
