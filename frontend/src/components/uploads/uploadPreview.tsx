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
            <img src={preview as string} alt={"uploaded file preview"} className={clsx(
                "max-h-64", "max-w-sm", "rounded",
            )}/>
        </>
    );
}
