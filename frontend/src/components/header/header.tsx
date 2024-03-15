import { clsx } from "clsx";
import { HeaderAccountButton } from "./header.accountButton";
import { HeaderLinkBar } from "./header.linkBar";
import { HeaderLogo } from "./header.logo";

export function Header() {
    return (
        <nav className={clsx("flex", "flex-wrap")}>
            <HeaderLogo/>
            <HeaderAccountButton/>
            <HeaderLinkBar/>
        </nav>
    );
}
