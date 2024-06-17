"use client";

import { clsx } from "clsx";
import { useEffect, useState } from "react";
import Image from "next/image";

export function CreateUploadForm() {
    const [selectedFiles, setSelectedFiles] = useState<FileList>([] as unknown as FileList);
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    useEffect(() => {
        if (selectedFiles.length === 0) {
            setFilePreviews([]);
            return;
        }
        const previews: string[] = [];
        for (const file of selectedFiles) {
            previews.push(URL.createObjectURL(file));
        }
        setFilePreviews(previews);
        return () => {
            for (const preview of previews) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [selectedFiles]);

    return (
        <div className={clsx(
            "rounded",
            "p-2",
            "bg-colour-tertiary", "text-colour-text", "transitions",
        )}>
            <form className={clsx("space-y-2")}>
                <label onChange={(event) => {
                    const x = (event.target as HTMLInputElement).files;
                    setSelectedFiles(x || [] as unknown as FileList);
                }} className={clsx(
                    "flex", "items-center", "rounded",
                    "p-1",
                    "bg-colour-secondary", "transitions",
                )}>
                    <p className={"sr-only"}>File</p>
                    <input type="file" id="file" name="file" multiple={true} className={clsx(
                        "file:me-2", "file:rounded", "file:border-0", "w-full",
                        "file:bg-colour-accent", "hover:file:bg-colour-accent-hover", "file:transitions",
                    )}/>
                </label>
                {(selectedFiles.length != 0) &&
                    <div className={clsx("space-y-2")}>
                        {filePreviews.map(
                            (preview, index) => (
                                <div key={index} className={clsx(
                                    "p-2", "rounded",
                                    "bg-colour-secondary", "transitions"
                                )}>
                                    <img src={preview} alt={"selected file preview"} className={clsx(
                                        "rounded", "h-16"
                                    )}/>
                                </div>
                            ))}
                    </div>
                }
            </form>
        </div>
    );
}
