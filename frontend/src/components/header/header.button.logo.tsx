import { clsx } from "clsx";
import Link from "next/link";

export function HeaderLogoButton() {
    return (
        <Link href={"/"}
              className={clsx(
                  "flex", "items-center", "justify-center", "rounded",
                  "h-10", "mr-2", "px-2", "space-x-2",
                  "bg-colour-secondary", "hover:bg-colour-secondary-hover",
                  "fill-colour-accent", "hover:fill-colour-accent-hover",
                  "text-colour-text", "hover:text-colour-text-hover",
                  "text-size-7",
                  "transitions",
              )}>
            <svg width="32px" height="32px" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4
                 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0
                 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4
                 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39
                 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/>
            </svg>
            <p>Uploader</p>
        </Link>
    );
}
