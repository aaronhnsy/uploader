import { FileGrid } from "@/components/files";
import { getFiles } from "@/actions/getFiles";

export default async function Page() {
    const files = (await getFiles()).reverse();
    return (
        <FileGrid files={files}></FileGrid>
    );
}
