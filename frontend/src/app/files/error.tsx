"use client";

import { clsx } from "clsx";

export default function Error() {
    return (
        <div className={clsx("u-centered")}>
            <h1 className={clsx("font-bold", "text-lg", "text-theme-text", "u-transition")}>
                Something went wrong!
            </h1>
        </div>
    );
}
