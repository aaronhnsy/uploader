"use client";

import { clsx } from "clsx";
import { type MutableRefObject, useRef } from "react";

const uploadIcon = (
    <svg width="20" height="20" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3
                 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8
                 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0
                 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48
                 24 24 0 1 0 0 48z"/>
    </svg>
);

export function CreateUploadButton() {
    const createUploadModalRef: MutableRefObject<HTMLDialogElement | null> = useRef(null)
    return (
        <>
            <button className={clsx(
                "flex", "items-center", "justify-center", "rounded",
                "p-2", "space-x-2",
                "bg-colour-tertiary", "fill-colour-accent", "text-colour-text",
                "hover:bg-colour-tertiary-hover", "hover:fill-colour-accent-hover", "hover:text-colour-text-hover",
                "transitions",
            )} type="button" aria-label="create upload" onClick={() => {createUploadModalRef.current?.showModal()}}>
                {uploadIcon}
                <p>Create Upload</p>
            </button>
            <dialog ref={createUploadModalRef}>
                hi
            </dialog>
        </>

    );
}
