import { clsx } from "clsx";
import { useUser } from "@/src/hooks/useUser";

export default async function Page() {
    let user = await useUser();
    if (user !== null) {
        return (
            <div className={clsx("flex-1", "flex", "items-center", "justify-center")}>
                <h1 className={clsx("font-bold", "text-lg", "text-theme-text", "u-transition")}>
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
                "u-transition"
            )} action="/api/login" method="post">
                <div className={clsx("flex", "flex-col", "space-y-2", "mb-3")}>
                    <label className={clsx("font-bold", "text-md", "text-theme-text", "u-transition")} htmlFor="username">
                        Username
                    </label>
                    <input className={clsx(
                        "p-2",
                        "font-semibold", "text-sm", "text-theme-text",
                        "bg-theme-tertiary", "rounded",
                        "u-transition"
                    )} id="username" type="text" name="username"/>
                </div>
                <div className={clsx("flex", "flex-col", "space-y-2", "mb-3")}>
                    <label className={clsx("font-bold", "text-md", "text-theme-text", "u-transition")} htmlFor="password">
                        Password
                    </label>
                    <input className={clsx(
                        "p-2",
                        "font-semibold", "text-sm", "text-theme-text",
                        "bg-theme-tertiary", "rounded",
                        "u-transition"
                    )} id="password" type="password" name="password"/>
                </div>
                <button className={clsx(
                    "c-button", "h-10",
                    "bg-theme-accent", "hover:bg-theme-accent-hover",
                    "font-bold", "text-md",
                    "text-gray-800", "hover:text-gray-900",
                    "u-transition",
                )} type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}
