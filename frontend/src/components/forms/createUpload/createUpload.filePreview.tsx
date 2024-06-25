"use client";

import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

interface UploadPreviewProps {
    file: File;
}

export function CreateUploadFilePreview({ file }: UploadPreviewProps) {
    const { pending } = useFormStatus();
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
            <button type="submit" aria-label="submit file upload" aria-disabled={pending}
                    className={clsx(
                        "flex", "items-center", "justify-center", "rounded",
                        "h-10",
                        "bg-colour-accent", "hover:bg-colour-accent-hover",
                        "text-size-7", "text-gray-800", "hover:text-gray-900",
                        "transitions",
                    )}>
                {pending ? "Upload.." : "Upload"}
            </button>
        </div>
    );
}
