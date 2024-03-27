import { clsx } from "clsx";
import { HeaderAccountButton } from "./header.button.account";
import { HeaderLinks } from "./header.links";
import { HeaderLogoButton } from "./header.button.logo";

export function Header() {
    return (
        <nav className={clsx("flex", "flex-wrap")}>
            <HeaderLogoButton/>
            <HeaderAccountButton/>
            <HeaderLinks/>
        </nav>
    );
}
