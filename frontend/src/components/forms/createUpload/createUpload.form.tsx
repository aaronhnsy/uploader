"use client";

import { uploadFile } from "@/actions/uploadFile";
import { clsx } from "clsx";
import { useState } from "react";
import { useFormState } from "react-dom";
import { CreateUploadFilePreview } from "./createUpload.filePreview";

const initialState = {
    message: "",
};

export function CreateUploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [state, formAction] = useFormState(uploadFile, initialState);
    return (
        <form className={clsx(
            "flex", "flex-col", "rounded",
            "p-2",
            "bg-colour-secondary", "transitions",
        )} action={formAction}>
            <label className={clsx(
                "flex", "items-center", "justify-between",
                "max-w-fit"
            )} onChange={event => {
                setFile((event.target as HTMLInputElement).files?.item(0) ?? null);
            }}>
                <input type="file" id="file" name="file" className={clsx("hidden")}/>
                <p className={clsx(
                    "flex-none", "flex", "items-center", "justify-center", "rounded",
                    "px-2", "me-2", "h-8",
                    "bg-colour-accent", "hover:bg-colour-accent-hover",
                    "text-colour-light-text", "text-size-7",
                    "transitions",
                )}>
                    {file ? "Change File" : "Select File"}
                </p>
                <p className={clsx(
                    "flex-initial", "flex", "items-center", "justify-end", "rounded",
                    "px-2", "h-8",
                    "bg-colour-tertiary", "text-colour-text", "text-size-8", "truncate",
                    "transitions",
                )}>
                    {file?.name ?? "No file selected"}
                </p>
            </label>
            {(file !== null) && <CreateUploadFilePreview file={file}/>}
            {state.message && (
                <div className={clsx("text-size-7", "text-colour-dark-red-accent")}>
                    {state.message}
                </div>
            )}
        </form>
    );
}
