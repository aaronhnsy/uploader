import { clsx } from "clsx";

export default function Page() {
    return (
        <div className={clsx("flex-1", "flex", "items-center", "justify-center")}>
            <h1 className={clsx("font-bold", "text-lg", "text-theme-text", "u-transition")}>
                Home
            </h1>
        </div>
    );
}
