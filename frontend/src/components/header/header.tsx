import { clsx } from "clsx";
import Link from "next/link";
import { headerLogoIcon } from "./header.icons";
import { HeaderLinkBar } from "./header.linkBar";
import { HeaderAccountButton } from "./header.accountButton";

export function Header() {
    return (
        <nav className="flex flex-wrap">
            <Link href={"/"}
                  className={clsx(
                      "c-button", "h-10",
                      "px-3", "space-x-3", "mr-3",
                      "font-bold", "text-lg", "text-gray-100", "hover:text-gray-300",
                      "bg-colour-primary", "hover:bg-colour-secondary",
                      "fill-colour-accent-primary", "hover:fill-colour-accent-secondary",
                      "u-ring-accent", "u-transition",
                  )}>
                {headerLogoIcon}
                <p>Uploader</p>
            </Link>
            <HeaderAccountButton/>
            <HeaderLinkBar/>
        </nav>
    );
}
