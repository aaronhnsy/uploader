import { clsx } from "clsx";
import Link from "next/link";
import { logoIcon } from "./navbar.icons";

export function NavbarLogo() {
    return (
        <Link href={"/"}
              className={clsx(
                  "c-button", "h-10",
                  "px-3", "space-x-3", "mr-3",
                  "font-bold", "text-lg",
                  "text-gray-100", "hover:text-gray-300",
                  "bg-colour-primary", "hover:bg-colour-secondary",
                  "fill-colour-accent-primary", "hover:fill-colour-accent-secondary",
                  "u-ring-accent", "u-transition",
              )}>
            {logoIcon}
            <h1>Uploader</h1>
        </Link>
    );
}
