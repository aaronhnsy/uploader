import { clsx } from "clsx";
import { login } from "./login";

export default function Page() {
    return (
        <div className={clsx("flex-1", "flex", "items-center", "justify-center")}>
            <form className={clsx(
                "flex", "flex-col", "grow",
                "p-3", "max-w-96", "space-y-3",
                "bg-colour-primary", "rounded",
            )} action={login} >
                <div className={clsx("flex", "flex-col", "space-y-2")}>
                    <label className={clsx("font-bold", "text-md", "text-gray-100")} htmlFor="email">
                        Email Address
                    </label>
                    <input className={clsx(
                        "p-2",
                        "font-semibold", "text-sm", "text-gray-100",
                        "bg-colour-secondary", "rounded",
                    )} id="email" type="email" name="email" placeholder="aaron@hnsy.com"/>
                </div>
                <div className={clsx("flex", "flex-col", "space-y-2")}>
                    <label className={clsx("font-bold", "text-md", "text-gray-100")} htmlFor="password">
                        Password
                    </label>
                    <input className={clsx(
                        "p-2",
                        "font-semibold", "text-sm", "text-gray-100",
                        "bg-colour-secondary", "rounded",
                    )} id="password" type="password" name="password" placeholder="********"/>
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
