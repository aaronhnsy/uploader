import { clsx } from "clsx";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export function NavbarLink({href, text}: { href: LinkProps<typeof Link>["href"], text: string }) {
    return (
        <Link href={href}
              className={clsx(
                  "p-2", "rounded",
                  "font-bold", "text-sm",
                  (usePathname() === href)
                      ? ["text-yellow-400", "sm:text-yellow-500", "dark:text-yellow-400", "dark:sm:text-yellow-400"]
                      : ["text-gray-100", "sm:text-gray-900", "dark:text-gray-100", "dark:sm:text-gray-100"],
                  "hover:bg-gray-700", "sm:hover:bg-gray-300", "dark:hover:bg-gray-700", "dark:sm:hover:bg-gray-700",
                  "transition-colors", "duration-300", "ease-in-out",
              )}>
            {text}
        </Link>
    );
}
