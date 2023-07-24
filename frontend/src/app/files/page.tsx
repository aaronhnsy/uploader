import { FileGrid, getFiles } from "@/src/components/files";

export default async function Files() {
    const files = (await getFiles()).reverse();
    return (
        <FileGrid files={files}></FileGrid>
    )
}
