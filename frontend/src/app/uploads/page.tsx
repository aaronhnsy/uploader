import { getUploads } from "@/actions/getUploads";
import { CreateUploadForm } from "@/components/forms/createUpload";
import { UploadGrid } from "@/components/uploads";
import { clsx } from "clsx";

export default async function Page() {
    return (
        <div className={clsx("flex-1", "flex", "flex-col", "space-y-2")}>
            <CreateUploadForm/>
            <UploadGrid uploads={await getUploads()}/>
        </div>
    );
}
