import { useUser } from "@/hooks/useUser";
import { clsx } from "clsx";

export default async function Page() {
    let user = await useUser();
    if (user !== null) {
        return (
            <div className={clsx("flex-1", "flex", "items-center", "justify-center")}>
                <h1 className={clsx("font-bold", "text-lg", "text-theme-text", "cu-transition")}>
                    You are already logged in!
                </h1>
            </div>
        );
    }
    return (
        <div className={clsx("flex-1", "flex", "items-center", "justify-center")}>
            <form className={clsx(
                "flex", "flex-col", "grow",
                "p-3", "max-w-96",
                "bg-theme-secondary", "rounded",
                "cu-transition",
            )} action="/_api/login" method="post">
                <div className={clsx("flex", "flex-col", "space-y-2", "mb-3")}>
                    <label className={clsx("font-bold", "text-md", "text-theme-text", "cu-transition")}
                           htmlFor="username">
                        Username
                    </label>
                    <input className={clsx(
                        "p-2", "rounded",
                        "bg-theme-tertiary",
                        "text-theme-text",
                        "font-semibold", "text-sm",
                        "cu-transition",
                    )} id="username" type="text" name="username"/>
                </div>
                <div className={clsx("flex", "flex-col", "space-y-2", "mb-3")}>
                    <label className={clsx("font-bold", "text-md", "text-theme-text", "cu-transition")}
                           htmlFor="password">
                        Password
                    </label>
                    <input className={clsx(
                        "p-2", "rounded",
                        "bg-theme-tertiary",
                        "text-theme-text",
                        "font-semibold", "text-sm",
                        "cu-transition",
                    )} id="password" type="password" name="password"/>
                </div>
                <button className={clsx(
                    "flex", "items-center", "justify-center", "rounded",
                    "h-10",
                    "bg-theme-accent", "hover:bg-theme-accent-hover",
                    "text-gray-800", "hover:text-gray-900",
                    "font-bold", "text-md",
                    "cu-transition",
                )} type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}
