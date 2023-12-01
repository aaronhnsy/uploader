import { clsx } from "clsx";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export function NavbarLink({href, text}: { href: LinkProps<typeof Link>["href"], text: string }) {
    return (
        <Link href={href}
              className={clsx(
                  "py-2", "px-3", "rounded",
                  "font-bold", "text-sm",
                  (usePathname() === href)
                      ? [clsx(
                          "text-colour-accent-primary", "hover:text-colour-accent-secondary",
                          "decoration-colour-accent-primary", "hover:decoration-colour-accent-secondary", "decoration-2",
                          "sm:underline", "sm:underline-offset-2",
                      )]
                      : [clsx(
                          "text-gray-100", "hover:text-gray-300",
                          "sm:text-gray-900", "sm:hover:text-gray-950",
                          "dark:sm:text-gray-100", "dark:sm:hover:text-gray-300",
                      )],
                  "hover:bg-colour-secondary", "hover:sm:bg-colour-background-hover",
                  "u-ring-accent", "u-transition",
              )}>
            <p>{text}</p>
        </Link>
    );
}
