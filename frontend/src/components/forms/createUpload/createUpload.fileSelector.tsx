"use client";

import { clsx } from "clsx";
import { type Dispatch, DragEvent, type FormEvent, type SetStateAction, useEffect, useRef, useState } from "react";

const imageMimeTypes = ["image/apng", "image/avif", "image/gif", "image/jpeg", "image/png", "image/webp", "image/svg+xml"];
const videoMimeTypes = ["video/mp4", "video/webm"];
const audioMimeTypes = ["audio/mpeg", "audio/ogg", "audio/wav", "audio/webm"];

function getFilePreview(file: File, previewURL: string) {
    if (imageMimeTypes.includes(file.type)) {
        return <img src={previewURL} alt="uploaded file preview" className={clsx("rounded", "max-h-full")}/>;
    }
    else if (videoMimeTypes.includes(file.type)) {
        return <video src={previewURL} controls={true} className={clsx("rounded", "max-h-full")}/>;
    }
    else if (audioMimeTypes.includes(file.type)) {
        return <audio src={previewURL} controls={true} className={clsx("rounded", "max-h-full")}/>;
    }
    else {
        return <p className={clsx("text-size-6", "text-colour-text", "transitions")}>{file.name}</p>;
    }
}

interface CreateUploadFileSelectorProps {
    file: File | null;
    setFile: Dispatch<SetStateAction<File | null>>;
}

export function CreateUploadFileSelector({ file, setFile }: CreateUploadFileSelectorProps) {
    // file preview
    const [previewURL, setPreviewURL] = useState<string | null>(null);
    useEffect(() => {
        if (file === null) {
            setPreviewURL(null)
            return
        }
        const url = URL.createObjectURL(file);
        setPreviewURL(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);
    // drag and drop
    const [onDragoverHover, setOnDragoverHover] = useState<boolean>(false);
    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragoverHover(true);
    };
    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragoverHover(false);
    };
    const fileInput = useRef<HTMLInputElement>(null);
    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragoverHover(false);
        setFile(event.dataTransfer.files.item(0) ?? null);
        (fileInput.current as HTMLInputElement).files = event.dataTransfer.files;
    };
    // form file input
    const handleFileChange = (event: FormEvent<HTMLLabelElement>) => {
        setFile((event.target as HTMLInputElement).files?.item(0) ?? null);
    };
    return (
        <label onChange={handleFileChange} className={clsx(
            "flex-1", "flex", "flex-col", "items-stretch", "justify-center", "rounded",
            "p-2", "h-48", "lg:max-w-sm",
            "border-4", "border-dashed",
            "bg-colour-main-300", "hover:bg-colour-main-400",
            "border-colour-accent", "hover:border-colour-accent-hover",
            "fill-colour-accent", "hover:fill-colour-accent-hover",
            onDragoverHover ? ["bg-colour-main-400", "border-colour-accent-hover", "fill-colour-accent-hover"] : "",
            "transitions-all",
        )}>
            <input type="file" name="file" ref={fileInput} className={clsx("hidden")}/>
            <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDragEnd={handleDragLeave}
                 onDrop={handleDrop} className={clsx(
                "flex-1", "flex", "flex-col", "items-center", "justify-center",
                "space-y-4", "size-full",
            )}>
                {(file === null) ? (
                    <>
                        <svg width="64" height="64" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5
                                     12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3
                                     0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64
                                     352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0
                                     35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432
                                     456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z">
                            </path>
                        </svg>
                        <div className={clsx("flex", "flex-col", "items-center", "justify-center")}>
                            <p className={clsx("text-size-6", "text-colour-text", "transitions")}>
                                click to select a file
                            </p>
                            <p className={clsx("text-size-8", "text-colour-text", "transitions")}>
                                (or drag one over this box)
                            </p>
                        </div>
                    </>
                ) : (getFilePreview(file, previewURL as string))}
            </div>
        </label>
    );
}
