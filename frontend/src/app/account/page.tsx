import { useUser } from "@/hooks/useUser";
import { clsx } from "clsx";

export default async function Page() {
    let user = await useUser();
    return (
        <div className={clsx("flex-1", "flex", "items-center", "justify-center", "px-2")}>
            {user !== null
                ? (
                    <div className={clsx("flex", "flex-col", "space-y-3")}>
                        <h1 className={clsx("font-bold", "text-lg", "text-theme-text", "cu-transition")}>
                            Welcome, {user.name}
                        </h1>
                        <button className={clsx(
                            "flex", "items-center", "justify-center", "rounded",
                            "h-10", "px-3",
                            "bg-theme-accent", "hover:bg-theme-accent-hover",
                            "text-gray-800", "hover:text-gray-900",
                            "font-bold", "text-sm",
                            "cu-transition",
                        )} type="button">
                            Logout
                        </button>
                    </div>
                )
                : (
                    <h1 className={clsx("font-bold", "text-lg", "text-theme-text", "cu-transition")}>
                        You are already logged in
                    </h1>
                )
            }
        </div>
    );
}
