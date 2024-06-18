import { getUploads } from "@/actions/getUploads";
import { CreateUploadForm, UploadGrid } from "@/components/uploads";
import { clsx } from "clsx";

export default async function Page() {
    return (
        <div className={clsx("space-y-2")}>
            <CreateUploadForm/>
            <UploadGrid uploads={await getUploads()}/>
        </div>
    );
}
