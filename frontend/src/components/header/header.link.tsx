import { clsx } from "clsx";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface HeaderLinkProps {
    href: LinkProps<typeof Link>["href"];
    text: string;
}

export function HeaderLink({ href, text }: HeaderLinkProps) {
    return (
        <Link href={href}
              className={clsx(
                  "flex", "items-center", "justify-center", "rounded",
                  "h-10", "px-2",
                  "bg-colour-secondary", "hover:bg-colour-secondary-hover",
                  (usePathname() === href) ? [
                      "text-colour-accent", "hover:text-colour-accent-hover",
                      "decoration-2", "underline", "underline-offset-2",
                      "decoration-colour-accent", "hover:decoration-colour-accent-hover",
                  ] : [
                      "text-colour-text", "hover:text-colour-text-hover",
                  ],
                  "text-size-8",
                  "transitions",
              )}>
            <p>{text}</p>
        </Link>
    );
}
