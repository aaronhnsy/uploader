import { getUser } from "@/actions/getUser";
import { LoginForm } from "@/components/login";
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
            "bg-colour-secondary", "transitions",
        )}>
            <div className={clsx(
                "grid", "grid-cols-5", "gap-2", "flex-1",
            )}>
                <div className={clsx(
                    "flex", "flex-col", "items-center", "justify-center", "rounded",
                    "col-span-3", "p-2",
                    "bg-colour-primary", "text-colour-text", "transitions",
                )}>
                    <p className={clsx("text-size-3")}>Name</p>
                    <p className={clsx("text-size-4")}>{user.username}</p>
                </div>
                <div className={clsx(
                    "flex", "flex-col", "items-center", "justify-center", "rounded",
                    "col-span-3", "row-start-2", "p-2",
                    "bg-colour-primary", "text-colour-text", "transitions",
                )}>
                    <p className={clsx("text-size-3")}>Upload Count</p>
                    <p className={clsx("text-size-4")}>{user.upload_count}</p>
                </div>
                <div className={clsx(
                    "flex", "flex-wrap", "items-center", "justify-center", "md:justify-evenly", "rounded",
                    "col-span-2", "row-span-2", "p-2",
                    "bg-colour-primary", "text-colour-text", "transitions",
                )}>
                    <Image className={clsx("rounded")} height="200" width="200"
                           src={user.profile_picture} alt="current user profile picture"/>
                    <div className={clsx(
                        "flex", "items-center", "justify-center", "rounded",
                        "px-2", "py-1", "space-x-2",
                        "bg-colour-secondary", "fill-colour-accent", "text-colour-text",
                        "hover:bg-colour-secondary-hover", "hover:fill-colour-accent-hover", "hover:text-colour-text-hover",
                        "transitions",
                    )}>
                        <p>upload new</p>
                        <svg width="16" height="16" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5
                                     12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3
                                     0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0
                                     35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64
                                     64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48
                                     24 24 0 1 0 0 48z"/>
                        </svg>
                    </div>
                </div>
                {
                    Array.from({ length: 25 }).map((_, index) => (
                        <div key={index} className={clsx(
                            "flex", "items-center", "justify-center", "rounded",
                            "p-2",
                            "bg-colour-primary", "text-colour-text", "transitions",
                        )}>
                            {index + 1}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
