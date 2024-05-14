"use client";

import Image from "next/image";
import { Masonry } from "react-plock";
import { File } from "./getFiles";

export function FileGrid({files}: { files: File[] }) {
    return (
        <div>
            <Masonry
                config={{
                    columns: [2, 2, 3, 3, 4, 4],
                    gap: [16, 16, 16, 16, 16, 16],
                    media: [576, 768, 992, 1200, 1400, 1600],
                }}
                items={files}
                render={
                    (file, _) => {
                        switch (file.format) {
                            case "mp4":
                                return (
                                    <video className="ring-0 outline-2 outline-dashed outline-theme-accent w-full h-auto rounded hover:scale-105 transition-transform duration-300"
                                           src={`https://uploader.hnsy.dev/${file.user_id}/${file.filename}`}
                                           key={file.filename}
                                           width={0} height={0}
                                           style={{width: "100%", height: "auto"}}
                                           autoPlay={true}
                                           controls={false}
                                           muted={true}/>
                                );
                            default:
                                return (
                                    <Image className="ring-0 outline-2 outline-dashed outline-theme-accent w-full h-auto rounded hover:scale-105 transition-transform duration-300"
                                           src={`https://uploader.hnsy.dev/${file.user_id}/${file.filename}`}
                                           alt="hi"
                                           key={file.filename}
                                           width={0}
                                           height={0}
                                           sizes={"100vw"}/>
                                );
                        }
                    }
                }
            />
        </div>
    );
}
