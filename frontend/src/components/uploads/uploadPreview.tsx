"use client";

import { clsx } from "clsx";
import { useEffect, useState } from "react";

interface UploadPreviewProps {
    file: File;
}

export function UploadPreview({ file }: UploadPreviewProps) {
    const [preview, setPreview] = useState<string | null>(null);
    useEffect(() => {
        if (file === null) {
            setPreview(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);
    return (
        <>
            <label className={clsx(
                "flex", "rounded",
                "ps-2", "pe-1", "py-1",
                "bg-colour-tertiary", "transitions"
            )}>
                Custom Filename:
                <input className={clsx(
                    "flex-1", "rounded",
                    "ms-2", "px-2",
                    "bg-colour-tertiary-hover",
                )}/>
            </label>
            <img src={preview as string} alt={"uploaded file preview"} className={clsx(
                "max-h-64", "max-w-sm", "rounded",
            )}/>
        </>
    );
}
