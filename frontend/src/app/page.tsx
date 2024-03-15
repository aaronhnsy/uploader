import { clsx } from "clsx";

export default function Page() {
    return (
        <div className={clsx("u-centered", "px-2")}>
            <h1 className={clsx("font-bold", "text-lg", "text-theme-text", "u-transition")}>
                Home
            </h1>
        </div>
    );
}
