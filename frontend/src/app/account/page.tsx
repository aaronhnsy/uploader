import { clsx } from "clsx";
import { useUser } from "@/src/hooks/useUser";

export default async function Page() {
    let user = await useUser();
    return (
        <div className={clsx("flex-1", "flex", "items-center", "justify-center")}>
            <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {user !== null
                    ? (<>
                        Welcome, {user.name}
                        <button className={clsx(
                            "c-button", "h-10", "px-3",
                            "font-bold", "text-md", "text-gray-900", "hover:text-gray-950",
                            "bg-colour-accent-primary", "hover:bg-colour-accent-secondary",
                            "u-ring-primary", "u-transition",
                        )} type="button">
                            Logout
                        </button>
                    </>)
                    : ("You are already logged in")
                }
            </h1>
        </div>
    );
}
