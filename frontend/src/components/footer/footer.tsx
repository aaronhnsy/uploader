import { clsx } from "clsx";
import { FooterThemeSwitcher } from "./footer.themeSwitcher";

export function Footer() {
    return (
        <footer className={clsx(
            "flex", "justify-between", "items-center", "rounded",
            "p-2",
            "bg-theme-secondary", "cu-transition",
        )}>
            <p className={clsx("font-semibold", "text-md", "text-theme-text", "cu-transition")}>aaronhnsy</p>
            <div className={clsx("space-y-2")}>
                <FooterThemeSwitcher/>
            </div>
        </footer>
    );
}
