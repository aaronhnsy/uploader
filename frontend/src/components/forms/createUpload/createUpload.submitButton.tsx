"use client";

import { clsx } from "clsx";
import { useFormStatus } from "react-dom";

export function CreateUploadSubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" aria-label="submit file upload" aria-disabled={pending}
                className={clsx(
                    "flex", "items-center", "justify-center", "rounded",
                    "h-10", "mt-2",
                    "bg-colour-accent", "hover:bg-colour-accent-hover",
                    "text-size-7", "text-gray-800", "hover:text-gray-900",
                    "transitions",
                )}>
            {pending ? "Upload.." : "Upload"}
        </button>
    );
}
