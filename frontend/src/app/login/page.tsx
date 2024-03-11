import { clsx } from "clsx";
import { login } from "./login";
import { useSession } from "@/src/hooks/session";

export default async function Page() {
    let session = await useSession();
    if (session !== null) {
        return (
            <div className={clsx("flex-1", "flex", "items-center", "justify-center")}>
                <div className={clsx(
                    "flex", "flex-col", "items-center", "justify-center",
                    "p-3", "max-w-96", "space-y-3",
                    "bg-colour-primary", "rounded",
                )}>
                    <h1 className={clsx("font-bold", "text-2xl", "text-gray-100")}>
                        Welcome, {session.username}
                    </h1>
                    <a className={clsx(
                        "c-button", "h-10",
                        "font-bold", "text-md", "text-gray-900", "hover:text-gray-950",
                        "bg-colour-accent-primary", "hover:bg-colour-accent-secondary",
                        "u-ring-primary", "u-transition",
                    )} href="/logout">Logout
                    </a>
                </div>
            </div>
        );
    }
    return (
        <div className={clsx("flex-1", "flex", "items-center", "justify-center")}>
            <form className={clsx(
                "flex", "flex-col", "grow",
                "p-3", "max-w-96",
                "bg-colour-primary", "rounded",
            )} action={login} >
                <div className={clsx("flex", "flex-col", "space-y-2", "mb-3")}>
                    <label className={clsx("font-bold", "text-md", "text-gray-100")} htmlFor="username">
                        Username
                    </label>
                    <input className={clsx(
                        "p-2",
                        "font-semibold", "text-sm", "text-gray-100",
                        "bg-colour-secondary", "rounded",
                    )} id="username" type="text" name="username"/>
                </div>
                <div className={clsx("flex", "flex-col", "space-y-2", "mb-3")}>
                    <label className={clsx("font-bold", "text-md", "text-gray-100")} htmlFor="password">
                        Password
                    </label>
                    <input className={clsx(
                        "p-2",
                        "font-semibold", "text-sm", "text-gray-100",
                        "bg-colour-secondary", "rounded",
                    )} id="password" type="password" name="password"/>
                </div>
                <button className={clsx(
                    "c-button", "h-10",
                    "font-bold", "text-md", "text-gray-900", "hover:text-gray-950",
                    "bg-colour-accent-primary", "hover:bg-colour-accent-secondary",
                    "u-ring-primary", "u-transition",
                )} type="submit">Login
                </button>
            </form>
        </div>
    );
}
