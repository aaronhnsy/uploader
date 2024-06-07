import { clsx } from "clsx";
import { FooterThemeSwitcher } from "./footer.themeSwitcher";

export function Footer() {
    return (
        <footer className={clsx(
            "flex", "items-center", "justify-between", "rounded",
            "p-2",
            "bg-colour-secondary", "transitions",
        )}>
            <p className={clsx("text-size-6", "text-colour-text", "transitions")}>aaronhnsy</p>
            <div className={clsx("space-y-2")}>
                <FooterThemeSwitcher/>
            </div>
        </footer>
    );
}
