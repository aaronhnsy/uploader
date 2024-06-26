"use client";

import { clsx } from "clsx";

export default function Error() {
    return (
        <div className={clsx("flex-1", "flex", "items-center", "justify-center")}>
            <h1 className={clsx("font-bold", "text-lg", "text-colour-text", "transitions")}>
                Something went wrong!
            </h1>
        </div>
    );
}
