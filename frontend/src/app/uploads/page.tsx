import { clsx } from "clsx";
import { UploadsGrid } from "components/uploads";
import { getUploads } from "@/actions/getUploads";

export default async function Page() {
    const uploads = (await getUploads()).reverse();
    return (
        <div className={clsx("flex", "flex-1", "items-center", "justify-center")}>
            <UploadsGrid uploads={uploads}></UploadsGrid>
        </div>
    );
}
