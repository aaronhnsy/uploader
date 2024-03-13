import { ThemeChanger } from "./footer.themeChanger";
import { clsx } from "clsx";

export function Footer() {
    return (
        <footer className={clsx("flex", "justify-between", "items-center", "p-2", "bg-theme-secondary", "rounded")}>
            <p className={clsx("font-semibold", "text-md", "text-theme-text")}>aaronhnsy</p>
            <ThemeChanger/>
        </footer>
    );
}
