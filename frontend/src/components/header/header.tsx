import { clsx } from "clsx";
import Link from "next/link";
import { HeaderAccountButton } from "./header.accountButton";
import { headerLogoIcon } from "./header.icons";
import { HeaderLinkBar } from "./header.linkBar";

export function Header() {
    return (
        <nav className={clsx("flex", "flex-wrap")}>
            <Link href={"/"}
                  className={clsx(
                      "c-button", "h-10", "px-3", "mr-3", "space-x-3",
                      "bg-theme-secondary", "hover:bg-theme-secondary-hover",
                      "fill-theme-accent", "hover:fill-theme-accent-hover",
                      "font-bold", "text-lg",
                      "text-theme-text", "hover:text-theme-text-hover",
                      "u-transition",
                  )}>
                {headerLogoIcon}
                <p>Uploader</p>
            </Link>
            <HeaderAccountButton/>
            <HeaderLinkBar/>
        </nav>
    );
}
