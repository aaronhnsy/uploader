import { clsx } from "clsx";
import { ThemeChanger } from "./footer.themeChanger";

export function Footer() {
    return (
        <footer className={clsx("flex", "justify-between", "items-center", "p-2", "bg-theme-secondary", "rounded", "u-transition")}>
            <p className={clsx("font-semibold", "text-md", "text-theme-text", "u-transition")}>aaronhnsy</p>
            <ThemeChanger/>
        </footer>
    );
}
