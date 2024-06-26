"use client";

import { uploadFile } from "@/actions/uploadFile";
import { CreateUploadFileSelector } from "@/components/forms/createUpload/createUpload.fileSelector";
import { clsx } from "clsx";
import { useState } from "react";
import { useFormState } from "react-dom";
import { CreateUploadFilePreview } from "./createUpload.filePreview";
import { CreateUploadSubmitButton } from "./createUpload.submitButton";

const initialState = {
    message: "",
};

export function CreateUploadForm() {
    const [state, formAction] = useFormState(uploadFile, initialState);
    const [file, setFile] = useState<File | null>(null);
    return (
        <form className={clsx(
            "flex", "flex-col", "rounded",
            "p-2",
            "bg-colour-secondary", "transitions",
        )} action={formAction}>
            <CreateUploadFileSelector file={file} fileChangeHandler={
                event => {
                    setFile((event.target as HTMLInputElement).files?.item(0) ?? null);
                }
            }/>
            {(file !== null) && (
                <>
                    <CreateUploadFilePreview file={file}/>
                    <CreateUploadSubmitButton/>
                </>
            )}

            {/*{state.message && (*/}
            {/*    <div className={clsx("text-size-7", "text-colour-dark-red-accent")}>*/}
            {/*        {state.message}*/}
            {/*    </div>*/}
            {/*)}*/}

        </form>
    );
}
