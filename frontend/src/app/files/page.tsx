import { FileGrid, getFiles } from "@/src/components/files";

export default async function Test() {
    const files = (await getFiles()).reverse();
    return (
        <FileGrid files={files}></FileGrid>
    )
}
