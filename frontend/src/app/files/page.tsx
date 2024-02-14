import { FileGrid, getFiles } from "@/src/components/files";

export default async function Page() {
    const files = (await getFiles()).reverse();
    return (
        <FileGrid files={files}></FileGrid>
    );
}
