"use client";

import { login } from "@/actions/login";
import { clsx } from "clsx";
import { useFormState } from "react-dom";
import { LoginSubmitButton } from "./login.submitButton";

const initialState = {
    message: "",
};

export function LoginForm() {
    const [state, formAction] = useFormState(login, initialState);
    return (
        <div className={clsx("flex-1", "flex", "items-center", "justify-center")}>
            <form className={clsx(
                "flex", "flex-col", "grow",
                "p-3", "max-w-96",
                "bg-colour-secondary", "rounded",
                "transitions",
            )} action={formAction}>
                <div className={clsx("flex", "flex-col", "space-y-2", "mb-3")}>
                    <label className={clsx("text-size-7", "text-colour-text", "transitions")}
                           htmlFor="username">
                        Username
                    </label>
                    <input className={clsx(
                        "p-2", "rounded",
                        "bg-colour-tertiary",
                        "text-size-8", "text-colour-text",
                        "transitions",
                    )} id="username" type="text" name="username"/>
                </div>
                <div className={clsx("flex", "flex-col", "space-y-2", "mb-3")}>
                    <label className={clsx("text-size-7", "text-colour-text", "transitions")}
                           htmlFor="password">
                        Password
                    </label>
                    <input className={clsx(
                        "p-2", "rounded",
                        "bg-colour-tertiary",
                        "text-size-8", "text-colour-text",
                        "transitions",
                    )} id="password" type="password" name="password"/>
                </div>
                <LoginSubmitButton/>
                {state.message && (
                    <div className={clsx("text-size-7", "text-colour-dark-red-accent", "mt-3")}>
                        {state.message}
                    </div>
                )}
            </form>
        </div>
    );
}
