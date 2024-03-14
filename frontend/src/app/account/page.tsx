import { useUser } from "@/hooks/useUser";
import { clsx } from "clsx";

export default async function Page() {
    let user = await useUser();
    return (
        <div className={clsx("u-centered")}>
            {user !== null
                ? (
                    <div className={clsx("flex", "flex-col", "space-y-3")}>
                        <h1 className={clsx("font-bold", "text-lg", "text-theme-text", "u-transition")}>
                            Welcome, {user.name}
                        </h1>
                        <button className={clsx(
                            "c-button", "h-10", "px-3",
                            "bg-theme-accent", "hover:bg-theme-accent-hover",
                            "font-bold", "text-sm",
                            "text-gray-800", "hover:text-gray-900",
                            "u-transition",
                        )} type="button">
                            Logout
                        </button>
                    </div>
                )
                : (
                    <h1 className={clsx("font-bold", "text-lg", "text-theme-text", "u-transition")}>
                        You are already logged in
                    </h1>
                )
            }
        </div>
    );
}
