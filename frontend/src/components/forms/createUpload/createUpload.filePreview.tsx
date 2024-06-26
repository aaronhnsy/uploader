"use client";

import { clsx } from "clsx";
import { useEffect, useState } from "react";

interface UploadPreviewProps {
    file: File;
}

export function CreateUploadFilePreview({ file }: UploadPreviewProps) {
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
        <div className={clsx("flex", "flex-col", "mx-auto", "mt-2", "space-y-2")}>
            <img src={preview as string} alt="uploaded file preview" className={clsx(
                "max-h-48", "rounded",
            )}/>
        </div>
    );
}
