import { clsx } from "clsx";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface HeaderLinkProps {
    href: LinkProps<typeof Link>["href"];
    text: string;
}

export function HeaderLink({href, text}: HeaderLinkProps) {
    return (
        <Link href={href}
              className={clsx(
                  "c-button-left-aligned", "h-10", "px-3",
                  "font-bold", "text-sm",
                  (usePathname() === href)
                      ? [
                          "text-theme-accent", "hover:text-theme-accent-hover",
                          "decoration-2", "underline", "underline-offset-2",
                          "decoration-theme-accent", "hover:decoration-theme-accent-hover",
                      ]
                      : [
                          "text-theme-text", "hover:text-theme-text-hover",
                      ],
                  "hover:bg-theme-secondary-hover", "sm:hover:bg-theme-primary-hover",
                  "u-transition",
              )}>
            <p>{text}</p>
        </Link>
    );
}
