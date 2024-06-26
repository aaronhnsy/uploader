"use client";

import { createUpload } from "@/actions/createUpload";
import { clsx } from "clsx";
import { useState } from "react";
import { useFormState } from "react-dom";

const initialState = {
    message: "",
};

export function CreateUploadForm() {
    const [state, formAction] = useFormState(createUpload, initialState);
    const [onHover, setOnHover] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    return (
        <form action={formAction} className={clsx(
            "flex", "rounded",
            "p-2",
            "bg-colour-main-200", "transitions",
        )}>
            <label className={clsx(
                "flex-1", "flex", "flex-col", "items-stretch", "justify-center", "rounded",
                "p-2", "h-48", "lg:max-w-sm",
                "border-4", "border-dashed",
                "bg-colour-main-300", "hover:bg-colour-main-400",
                "border-colour-accent", "hover:border-colour-accent-hover",
                "fill-colour-accent", "hover:fill-colour-accent-hover",
                onHover ? ["bg-colour-main-400", "border-colour-accent-hover", "fill-colour-accent-hover"] : "",
                "transitions-all",
            )} onChange={
                event => {
                    setFile((event.target as HTMLInputElement).files?.item(0) ?? null);
                }
            }>
                <input type="file" className={clsx("hidden")}/>
                <div className={clsx(
                    "flex-1", "flex", "flex-col", "items-center", "justify-center",
                    "space-y-4",
                )} onDragOver={
                    (event) => {
                        event.preventDefault();
                        setOnHover(true);
                    }
                } onDragLeave={
                    (event) => {
                        setOnHover(false);
                    }
                } onDragEnd={
                    (event) => {
                        event.preventDefault();
                        setOnHover(false);
                    }
                } onDrop={
                    (event) => {
                        event.preventDefault();
                        setOnHover(false);
                        if (event.dataTransfer.files.length <= 0) {
                            state.message = "No valid files were dropped";
                        }
                        setFile(event.dataTransfer.files.item(0));
                    }
                }>
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
                                <p className={clsx(
                                    "text-size-6", "text-colour-text", "transitions",
                                )}>click to select a file</p>
                                <p className={clsx(
                                    "text-size-8", "text-colour-text", "transitions",
                                )}>(or drag one over this box)</p>
                            </div>
                        </>
                    ) : (
                        <p className={clsx(
                            "text-size-8", "text-colour-text", "transitions",
                        )}>{file.name}</p>
                    )}
                </div>
            </label>
        </form>
    );
}
