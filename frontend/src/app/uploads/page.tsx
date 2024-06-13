import { clsx } from "clsx";
import { CreateUploadButton, UploadsGrid } from "components/uploads";
import { getUploads } from "@/actions/getUploads";

export default async function Page() {
    const uploads = (await getUploads()).reverse();
    return (
        <div className={clsx(
            "flex", "flex-col", "flex-1", "rounded",
            "p-2", "space-y-2",
            "bg-colour-secondary", "transitions"
        )}>
            <CreateUploadButton/>
            <UploadsGrid uploads={uploads}></UploadsGrid>
        </div>
    );
}
