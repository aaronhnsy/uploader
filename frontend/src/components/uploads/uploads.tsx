"use client";

import { Upload } from "@/actions/getUploads";
import Image from "next/image";
import { Masonry } from "react-plock";

export function UploadsGrid({ uploads }: { uploads: Upload[] }) {
    return (
        <div>
            <Masonry
                config={{
                    columns: [2, 2, 3, 3, 4, 4],
                    gap: [16, 16, 16, 16, 16, 16],
                    media: [576, 768, 992, 1200, 1400, 1600],
                }}
                items={uploads}
                render={
                    (upload, _) => {
                        switch (upload.filename.split(".").pop()) {
                            case "mp4":
                                return (
                                    <video
                                        className="ring-0 outline-2 outline-dashed outline-theme-accent w-full h-auto rounded hover:scale-105 transition-transform duration-300"
                                        src={upload.url}
                                        key={upload.filename}
                                        width={0} height={0}
                                        style={{ width: "100%", height: "auto" }}
                                        autoPlay={true}
                                        controls={false}
                                        muted={true}/>
                                );
                            default:
                                return (
                                    <Image
                                        className="ring-0 outline-2 outline-dashed outline-theme-accent w-full h-auto rounded hover:scale-105 transition-transform duration-300"
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
