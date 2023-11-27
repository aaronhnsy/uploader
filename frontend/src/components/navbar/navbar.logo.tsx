import { clsx } from "clsx";
import Link from "next/link";
import { logoIcon } from "./navbar.icons";

export function NavbarLogo() {
    return (
        <Link href={"/"}
              className={clsx(
                  "inline-flex", "items-center", "justify-center",
                  "h-10", "px-2", "space-x-2", "rounded",
                  "font-bold", "text-lg", "text-gray-100", "hover:text-gray-300",
                  "c_bg-primary", "c_fill-accent", "c_ring-accent", "transitions",
              )}>
            {logoIcon}
            <h1>Uploader</h1>
        </Link>
    );
}
