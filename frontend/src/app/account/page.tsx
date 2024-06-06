import { getUser } from "@/actions/getUser";
import { clsx } from "clsx";
import Image from "next/image";

export default async function Page() {
    let user = await getUser();
    return (
        <div className={clsx("flex-1", "flex")}>
            <div className={clsx(
                "flex-1", "grid", "grid-cols-6", "grid-rows-4", "gap-2", "p-2",
                "bg-theme-secondary", "rounded", "transitions",
            )}>
                <div className={clsx(
                    "col-span-4", "row-span-2", "flex", "flex-col", "items-center", "justify-center", "p-2",
                    "bg-theme-secondary-hover", "rounded", "transitions", "text-theme-text",
                )}>
                    <p className={clsx("text-size-4", "text-theme-text")}>{user.username}</p>
                    <p className={clsx("text-size-4", "text-theme-text")}>{user.upload_count}</p>

                </div>
                <div className={clsx(
                    "col-span-2", "row-span-4", "col-start-5", "flex", "items-center", "justify-center", "p-2",
                    "bg-theme-secondary-hover", "rounded", "transitions", "text-theme-text"
                )}>
                    <Image src={user.profile_picture} alt={"user profile picture"} width={128} height={128}></Image>
                </div>
                <div className={clsx(
                    "col-span-2", "row-span-2", "row-start-3", "flex", "items-center", "justify-center", "p-2",
                    "bg-theme-secondary-hover", "rounded", "transitions", "text-theme-text"
                )}>
                    3
                </div>
                <div className={clsx(
                    "col-span-2", "row-span-2", "col-start-3", "row-start-3", "flex", "items-center", "justify-center", "p-2",
                    "bg-theme-secondary-hover", "rounded", "transitions", "text-theme-text"
                )}>
                    4
                </div>
            </div>
        </div>

    );
}
