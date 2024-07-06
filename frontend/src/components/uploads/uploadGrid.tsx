"use client";

import { type Upload } from "@/actions/getUploads";
import { clsx } from "clsx";
import Image from "next/image";
import { Masonry } from "react-plock";

interface UploadGridProps {
    uploads: Upload[];
}

export function UploadGrid({ uploads }: UploadGridProps) {
    return (
        <div className={clsx(
            "flex-1", "flex", "rounded",
            "p-2",
            "bg-colour-main-200", "transitions",
        )}>
            <Masonry
                config={{
                    columns: [2, 3, 3, 4, 5, 6],
                    gap: [8, 8, 8, 8, 8, 8],
                    media: [576, 768, 992, 1200, 1400, 1600],
                }}
                items={uploads}
                render={
                    (upload, _) => {
                        switch (upload.filename.split(".").pop()) {
                            case "mp4":
                            case "webm":
                                return (
                                    <video
                                        className="w-full h-auto rounded hover:scale-[102%] transitions-all"
                                        src={upload.url} key={upload.filename} controls={true}
                                        style={{ width: "100%", height: "auto" }}/>
                                );
                            case "mp3":
                                return (
                                    <audio
                                        className="w-full h-10 appearance-none bg-colour-main-300 rounded p-1"
                                        src={upload.url} key={upload.filename} controls={true}/>
                                );
                            default:
                                return (
                                    <Image
                                        className="w-full h-auto rounded hover:scale-[102%] transitions-all"
                                        src={upload.url}
                                        key={upload.filename}
                                        width={0} height={0}
                                        alt="hi"
                                        sizes={"100vw"} unoptimized></Image>
                                );
                        }
                    }
                }
            />
        </div>
    );
}
