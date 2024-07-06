"use client";

import { createUpload } from "@/actions/createUpload";
import { clsx } from "clsx";
import { useState } from "react";
import { CreateUploadFileSelector } from "./createUpload.fileSelector";
import { CreateUploadSubmitButton } from "./createUpload.submitButton";

export function CreateUploadForm() {
    const [file, setFile] = useState<File | null>(null);
    return (
        <form action={createUpload} className={clsx(
            "flex", "rounded",
            "p-2", "w-full",
            "bg-colour-main-200", "transitions",
        )}>
            <CreateUploadFileSelector file={file} setFile={setFile}/>
            <CreateUploadSubmitButton/>
        </form>
    );
}
