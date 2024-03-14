import { FileGrid, getFiles } from "@/components/files";

export default async function Page() {
    const files = (await getFiles()).reverse();
    return (
        <FileGrid files={files}></FileGrid>
    );
}
