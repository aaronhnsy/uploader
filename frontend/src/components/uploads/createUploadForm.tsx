"use client";

import { clsx } from "clsx";
import { useRef } from "react";

export function CreateUploadForm() {
    const fileList = useRef(null);
    return (
        <div className={clsx(
            "rounded",
            "p-2",
            "bg-colour-tertiary", "text-colour-text", "transitions",
        )}>
            <form>
                <label onChange={
                    (event) => {
                        fileList.current.innerHTML = <h1>File List</h1>;
                    }
                } className={clsx(
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
                <div ref={fileList}>
                </div>
            </form>
        </div>
    );
}
