import { getUser } from "@/actions/getUser";
import { clsx } from "clsx";

export default async function Page() {
    let user = await getUser();
    return (
        <div className={clsx("flex-1", "flex", "items-center", "justify-center", "px-2")}>
            {user !== null
                ? (
                    <div className={clsx("flex", "flex-col", "space-y-3")}>
                        <h1 className={clsx("font-bold", "text-lg", "text-theme-text", "transitions")}>
                            Welcome, {user.username}
                        </h1>
                        <button className={clsx(
                            "flex", "items-center", "justify-center", "rounded",
                            "h-10", "px-3",
                            "bg-theme-accent", "hover:bg-theme-accent-hover",
                            "text-gray-800", "hover:text-gray-900",
                            "font-bold", "text-sm",
                            "transitions",
                        )} type="button">
                            Logout
                        </button>
                    </div>
                )
                : (
                    <h1 className={clsx("font-bold", "text-lg", "text-theme-text", "transitions")}>
                        You are not logged in.
                    </h1>
                )
            }
        </div>
    );
}
