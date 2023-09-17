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
                    gap: [12, 12, 12, 12, 12, 12],
                    media: [576, 768, 992, 1200, 1400, 1600],
                }}
                items={files}
                render={
                    (file, _) => {
                        switch (file.format) {
                            case "mp4":
                                return (
                                    <video className="w-full h-auto rounded shadow shadow-white hover:scale-110 transition-transform duration-300"
                                           src={`https://uploader.axel.casa/${file.user_id}/${file.format}/${file.name}.${file.format}`}
                                           key={file.name}
                                           width={0} height={0}
                                           style={{width: "100%", height: "auto"}}
                                           autoPlay={true}
                                           controls={false}
                                           muted={true}
                                    />
                                );
                            default:
                                return (
                                    <Image className="w-full h-auto rounded shadow shadow-white hover:scale-110 transition-transform duration-300"
                                           src={`https://uploader.axel.casa/${file.user_id}/${file.format}/${file.name}.${file.format}`}
                                           alt="hi"
                                           key={file.name}
                                           width={0}
                                           height={0}
                                           sizes={"100vw"}
                                    />
                                );
                        }
                    }
                }
            />
        </div>
    );
}
