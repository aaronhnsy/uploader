import { clsx } from "clsx";
import Link from "next/link";
import { logoIcon } from "./navbar.icons";
import { NavbarLinks } from "./navbar.links";

export function Navbar() {
    return (
        <nav className="flex flex-wrap">
            {/* Logo and Title */}
            <Link href={"/"}
                  className={clsx(
                      "c-button", "h-10",
                      "px-3", "space-x-3", "mr-3",
                      "font-bold", "text-lg", "text-gray-100", "hover:text-gray-300",
                      "bg-colour-primary", "hover:bg-colour-secondary",
                      "fill-colour-accent-primary", "hover:fill-colour-accent-secondary",
                      "u-ring-accent", "u-transition",
                  )}>
                {logoIcon}
                <p>Uploader</p>
            </Link>
            {/* Login Button */}
            <Link href={"/login"}
                  className={clsx(
                      "c-button", "h-10",
                      "px-3", "sm:order-1",
                      "font-bold", "text-sm", "text-gray-900", "hover:text-gray-950",
                      "bg-colour-accent-primary", "hover:bg-colour-accent-secondary",
                      "u-ring-primary", "u-transition",
                  )}>
                <p>Login</p>
            </Link>
            {/* Navbar Links */}
            <NavbarLinks></NavbarLinks>
        </nav>
    );
}
