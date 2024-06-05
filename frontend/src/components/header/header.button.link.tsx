import { clsx } from "clsx";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface HeaderLinkProps {
    href: LinkProps<typeof Link>["href"];
    text: string;
}

export function HeaderLinkButton({ href, text }: HeaderLinkProps) {
    return (
        <Link href={href}
              className={clsx(
                  "flex", "items-center", "justify-center", "rounded",
                  "h-10", "px-2",
                  "hover:bg-theme-secondary-hover", "sm:hover:bg-theme-primary-hover",
                  (usePathname() === href)
                  ? [
                          "text-theme-accent", "hover:text-theme-accent-hover",
                          "decoration-2", "underline", "underline-offset-2",
                          "decoration-theme-accent", "hover:decoration-theme-accent-hover",
                      ]
                  : [
                          "text-theme-text", "hover:text-theme-text-hover",
                      ],
                  "font-bold", "text-sm",
                  "transitions",
              )}>
            <p>{text}</p>
        </Link>
    );
}
