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
            <label onChange={event => {
                setFile((event.target as HTMLInputElement).files?.item(0) ?? null);
            }}>
                <input type="file" id="file" name="file" className={clsx("hidden")}/>
                <div className={clsx("flex", "items-center", "space-x-2")}>
                    <div className={clsx(
                        "flex", "flex-none", "items-center", "justify-center", "rounded",
                        "px-2", "py-1",
                        "bg-colour-accent", "hover:bg-colour-accent-hover",
                        "text-colour-light-text", "text-size-7",
                        "transitions",
                    )}>
                        {file ? "Change File" : "Select File"}
                    </div>
                    <div className={clsx(
                        "flex-initial", "rounded",
                        "px-2", "py-1", "overflow-x-auto",
                        "bg-colour-tertiary", "text-colour-text",
                        "transitions"
                    )}>
                        {file?.name ?? "No file selected"}
                    </div>
                </div>
            </label>
            {(file !== null) && <UploadPreview file={file}/>}
        </form>
    );
}
