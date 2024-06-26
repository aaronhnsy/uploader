import { getUser } from "@/actions/getUser";
import { UploadProfilePictureButton } from "@/components/account";
import { LoginForm } from "@/components/forms/login";
import { clsx } from "clsx";
import Image from "next/image";

export default async function Page() {
    const user = await getUser();
    if (user === null || user === undefined) {
        return <LoginForm/>;
    }
    return (
        <div className={clsx(
            "flex", "flex-1", "rounded",
            "p-2",
            "bg-colour-main-200", "transitions",
        )}>
            <div className={clsx(
                "grid", "grid-cols-5", "gap-2", "flex-1",
            )}>
                <div className={clsx(
                    "flex", "flex-col", "items-center", "justify-center", "rounded",
                    "col-span-3", "p-2",
                    "bg-colour-main-100", "text-colour-text", "transitions",
                )}>
                    <p className={clsx("text-size-3")}>Name</p>
                    <p className={clsx("text-size-4")}>{user.username}</p>
                </div>
                <div className={clsx(
                    "flex", "flex-col", "items-center", "justify-center", "rounded",
                    "col-span-3", "row-start-2", "p-2",
                    "bg-colour-main-100", "text-colour-text", "transitions",
                )}>
                    <p className={clsx("text-size-3")}>Upload Count</p>
                    <p className={clsx("text-size-4")}>{user.upload_count}</p>
                </div>
                <div className={clsx(
                    "flex", "flex-wrap", "items-center", "justify-center", "md:justify-evenly", "rounded",
                    "col-span-2", "row-span-2", "p-2",
                    "bg-colour-main-100", "text-colour-text", "transitions",
                )}>
                    <Image className={clsx("rounded")} height="200" width="200"
                           src={user.profile_picture} alt="current user profile picture"/>
                    <UploadProfilePictureButton/>
                </div>
                {
                    Array.from({ length: 25 }).map((_, index) => (
                        <div key={index} className={clsx(
                            "flex", "items-center", "justify-center", "rounded",
                            "p-2",
                            "bg-colour-main-100", "text-colour-text", "transitions",
                        )}>
                            {index + 1}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
