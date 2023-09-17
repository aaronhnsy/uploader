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
                      ? [clsx(
                          "text-accent", "hover:text-accent-hover",
                          "decoration-accent", "hover:decoration-accent-hover", "decoration-2",
                          "underline", "underline-offset-2",
                      )]
                      : [clsx(
                          "text-gray-100", "sm:text-gray-900", "dark:sm:text-gray-100",
                          "hover:text-gray-300", "sm:hover:text-gray-950", "dark:sm:hover:text-gray-300",
                      )],
                  "bg-transparent", "sm:bg-transparent", "dark:sm:bg-transparent",
                  "hover:bg-gray-950", "sm:hover:bg-gray-300", "dark:sm:hover:bg-gray-950",
                  "focus:outline-none", "focus:ring", "focus:ring-accent", "focus:ring-3",
                  "theme-transition",
              )}>
            <p>{text}</p>
        </Link>
    );
}
