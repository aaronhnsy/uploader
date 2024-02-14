import { clsx } from "clsx";
import Link from "next/link";

export function NavbarLogin() {
    return (
        <Link href={"/login"}
              className={clsx(
                  "c-button", "h-10",
                  "px-3", "sm:order-1",
                  "font-bold", "text-sm",
                  "text-gray-900", "hover:text-gray-950",
                  "bg-colour-accent-primary", "hover:bg-colour-accent-secondary",
                  "u-ring-primary", "u-transition",
              )}>
            <p>Login</p>
        </Link>
    );
}
