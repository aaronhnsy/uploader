import { clsx } from "clsx";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Uploader - Home",
}

export default function Page() {
    return (
        <div className={clsx("flex-1", "flex", "items-center", "justify-center")}>
            <h1 className={clsx("text-size-1", "text-theme-text", "transitions")}>
                Home
            </h1>
        </div>
    );
}
