import { clsx } from "clsx";
import type { FormEvent } from "react";

interface CreateUploadFileSelectorProps {
    file: File | null;
    fileChangeHandler: (event: FormEvent<HTMLLabelElement>) => void;
}

export function CreateUploadFileSelector({ file, fileChangeHandler }: CreateUploadFileSelectorProps) {
    return (
        <div className={clsx(
            "flex", "items-center", "justify-between",
            "max-w-fit", "space-x-2",
        )}>
            <label onChange={fileChangeHandler} className={clsx(
                "flex-none",
            )}>
                <input type="file" name="file" className={clsx(
                    "hidden",
                )}/>
                <p className={clsx(
                    "flex-none", "flex", "items-center", "justify-center", "rounded",
                    "px-2", "h-8", "text-size-7",
                    "bg-colour-accent", "hover:bg-colour-accent-hover",
                    "text-colour-light-text",
                    "transitions",
                )}>
                    {file ? "Change File" : "Select File"}
                </p>
            </label>
            <p className={clsx(
                "flex-initial", "flex", "items-center", "justify-end", "rounded",
                "px-2", "h-8", "text-size-8", "truncate",
                "bg-colour-main-300", "text-colour-text",
                "transitions",
            )}>
                {file?.name ?? "No file selected"}
            </p>
        </div>
    );
}
