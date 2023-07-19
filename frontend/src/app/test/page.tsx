import { FileGrid, getFiles } from "@/src/components/files";

export default async function Test() {
    const files = (await getFiles()).reverse();
    return (
        <div className="container-sm">
            <FileGrid files={files}></FileGrid>
        </div>
    )
}
