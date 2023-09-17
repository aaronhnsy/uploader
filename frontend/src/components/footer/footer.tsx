import { clsx } from "clsx";
import { FooterThemeChanger } from "./footer.themeChanger";

export function Footer() {
    return (
        <footer className={clsx(
            "flex", "flex-row",
            "p-2", "rounded",
            "bg-gray-900",
        )}>
            <small>Made by Axelancerr</small>
            <FooterThemeChanger/>
        </footer>
    );
}
