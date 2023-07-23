import { clsx } from "clsx";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({href, text}: { href: LinkProps<typeof Link>["href"], text: string }) {
    return (
        <Link href={href}
              className={clsx(
                  "p-2", "rounded",
                  "font-bold", "text-sm",
                  (usePathname() === href)
                      ? ["text-yellow-400", "dark:text-yellow-400", "sm:text-yellow-500", "sm:dark:text-yellow-400"]
                      : ["text-gray-100", "dark:text-gray-100", "sm:text-gray-900", "sm:dark:text-gray-100"],
                  "hover:bg-gray-700",
                  "theme-transition",
              )}>
            {text}
        </Link>
    );
}
