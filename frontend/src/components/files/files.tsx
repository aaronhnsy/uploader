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
                items={
                    files.map(
                        (file) => {
                            return `https://uploader.axel.casa/${file.user_id}/${file.format}/${file.name}.${file.format}`;
                        },
                    )
                }
                render={
                    (item, _) => {
                        return (
                            <Image
                                className="hover:scale-400"
                                src={item} alt="hi"
                                key={item}
                                width={0} height={0} sizes={"100vw"}
                                style={{width: "100%", height: "auto"}}
                            />
                        );
                    }
                }
            />
        </div>
    );
}
