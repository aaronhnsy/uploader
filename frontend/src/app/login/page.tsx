import { clsx } from "clsx";
import { login } from "./login";


export default function Page() {
    return (
        <div className="flex-1 flex items-center justify-center">
            <form action={login} className="flex flex-col p-3 space-y-3 bg-colour-primary rounded">
                <div className="space-y-2">
                    <label htmlFor="email"
                           className="block font-bold text-sm text-gray-100">
                        Email:
                    </label>
                    <input type="email" name="email" id="email" placeholder="name@company.com" required
                           className="p-2 bg-colour-secondary rounded"/>
                </div>
                <div className="space-y-2">
                    <label htmlFor="password"
                           className="block font-bold text-sm text-gray-100">
                        Password:
                    </label>
                    <input type="password" name="password" id="password" placeholder="••••••••••••••••" required
                           className="p-2 bg-colour-secondary rounded"/>
                </div>
                <button type="submit" aria-label="login"
                        className={clsx(
                            "c-button", "h-10",
                            "font-bold", "text-md",
                            "text-gray-900", "hover:text-gray-950",
                            "bg-colour-accent-primary", "hover:bg-colour-accent-secondary",
                            "u-ring-primary", "u-transition",
                        )}>
                    Login
                </button>
            </form>
        </div>
    );
}
