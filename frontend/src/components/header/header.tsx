import { clsx } from "clsx";
import { HeaderAccount } from "./header.account";
import { HeaderLinks } from "./header.links";
import { HeaderLogo } from "./header.logo";

export function Header() {
    return (
        <nav className={clsx("flex", "flex-wrap")}>
            <HeaderLogo/>
            <HeaderAccount/>
            <HeaderLinks/>
        </nav>
    );
}
