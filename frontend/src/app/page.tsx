import { clsx } from "clsx";

export default function Page() {
    return (
        <div className={clsx("flex-1", "flex", "items-center", "justify-center")}>
            <h1 className={clsx("text-lg", "cu-transition")}>
                Home
            </h1>
        </div>
    );
}
