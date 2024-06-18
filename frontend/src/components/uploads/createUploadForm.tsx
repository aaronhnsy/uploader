"use client";

import { clsx } from "clsx";
import { useState } from "react";
import { UploadPreview } from "./uploadPreview";

export function CreateUploadForm() {
    const [file, setFile] = useState<File | null>(null);
    return (
        <form className={clsx(
            "p-2", "space-y-2", "rounded",
            "bg-colour-secondary", "transitions",
        )}>
            <label className={clsx(
                "flex", "items-center", "rounded",
            )} onChange={event => {
                setFile((event.target as HTMLInputElement).files?.item(0) ?? null);
            }}>
                <p className={"sr-only"}>File</p>
                <input type="file" id="file" name="file" className={clsx(
                    "w-full", "file:me-2", "file:px-2", "file:py-1", "file:rounded", "file:border-0",
                    "text-size-8", "file:text-size-7", "file:capitalize",
                    "file:bg-colour-accent", "hover:file:bg-colour-accent-hover",
                    "file:transitions", "bg-colour-tertiary", "rounded",
                )}/>
            </label>
            {(file !== null) && (<UploadPreview file={file}/>)}
        </form>
    );
}
