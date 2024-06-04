"use client";

import { login } from "@/actions/login";
import { clsx } from "clsx";
import { useFormStatus } from 'react-dom'

export function LoginForm() {
    const { pending } = useFormStatus()
    return (
        <div className={clsx("flex-1", "flex", "items-center", "justify-center")}>
            <form className={clsx(
                "flex", "flex-col", "grow",
                "p-3", "max-w-96",
                "bg-theme-secondary", "rounded",
                "transitions",
            )} action={login} method="POST">
                <div className={clsx("flex", "flex-col", "space-y-2", "mb-3")}>
                    <label className={clsx("text-size-7", "text-theme-text", "transitions")}
                           htmlFor="username">
                        Username
                    </label>
                    <input className={clsx(
                        "p-2", "rounded",
                        "bg-theme-tertiary",
                        "text-size-8", "text-theme-text",
                        "transitions",
                    )} id="username" type="text" name="username"/>
                </div>
                <div className={clsx("flex", "flex-col", "space-y-2", "mb-3")}>
                    <label className={clsx("text-size-7", "text-theme-text", "transitions")}
                           htmlFor="password">
                        Password
                    </label>
                    <input className={clsx(
                        "p-2", "rounded",
                        "bg-theme-tertiary",
                        "text-size-8", "text-theme-text",
                        "transitions",
                    )} id="password" type="password" name="password"/>
                </div>
                <button className={clsx(
                    "flex", "items-center", "justify-center", "rounded",
                    "h-10",
                    "bg-theme-accent", "hover:bg-theme-accent-hover",
                    "text-size-7", "text-gray-800", "hover:text-gray-900",
                    "transitions",
                )} type="submit" aria-disabled={pending}>
                    {pending ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    )
}
