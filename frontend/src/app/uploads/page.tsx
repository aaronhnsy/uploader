import { UploadsGrid } from "components/uploads";
import { getUploads } from "@/actions/getUploads";

export default async function Page() {
    const uploads = (await getUploads()).reverse();
    return (
        <UploadsGrid uploads={uploads}></UploadsGrid>
    );
}
