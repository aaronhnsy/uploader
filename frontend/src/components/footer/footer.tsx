import { clsx } from "clsx";
import { FooterThemeSwitcher } from "./footer.themeSwitcher";

export function Footer() {
    return (
        <footer className={clsx(
            "flex", "justify-between", "items-center", "rounded",
            "p-2",
            "bg-theme-secondary", "transitions",
        )}>
            <p className={clsx("font-semibold", "text-md", "text-theme-text", "transitions")}>aaronhnsy</p>
            <div className={clsx("space-y-2")}>
                <FooterThemeSwitcher/>
            </div>
        </footer>
    );
}
