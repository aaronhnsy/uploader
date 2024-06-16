import { clsx } from "clsx";

export function CreateUploadForm() {
    return (
        <div className={clsx(
            "rounded",
            "p-2", "space-y-2",
            "bg-colour-tertiary", "text-colour-text", "transitions",
        )}>
            <h1 className={clsx("text-size-4")}>Create Upload</h1>
            <form>
                <div className={clsx(
                    "flex",
                    "space-x-2"
                )}>
                    <div className={clsx(
                        "flex-1", "flex", "items-center",
                        "p-2", "space-x-2", "rounded",
                        "bg-colour-secondary", "transitions"
                    )}>
                        <label htmlFor="file">File</label>
                        <input id="file" type="file" name="File"/>
                    </div>
                    <div className={clsx(
                        "flex", "items-center", "justify-center",
                        "p-2", "space-x-2", "rounded",
                        "bg-colour-secondary", "transitions"
                    )}>
                        <label htmlFor="use-original-filename">Use Original Filename</label>
                        <input id="use-original-filename" type="checkbox" name="Use Original Filename"/>
                    </div>
                </div>
            </form>
        </div>
    );
}
