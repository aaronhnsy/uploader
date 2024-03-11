import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import { useSession } from "@/src/hooks/session";

export async function HeaderAccountButton() {
    let session = await useSession();
    if (session !== null) {
        return (
            <Link href={"/"}
                  className={clsx(
                      "c-button", "h-10",
                      "px-3", "space-x-3", "mr-3", "sm:order-1",
                      "font-bold", "text-md",
                      "text-gray-900", "dark:text-gray-100", "hover:text-gray-950", "dark:hover:text-gray-300",
                      "hover:bg-colour-background-hover",
                      "u-ring-accent", "u-transition",
                  )}>
                <Image className="rounded-full" src={session.profile_picture} alt={"profile picture"} width="32" height="32"></Image>
                <p>{session.name}</p>
            </Link>
        );
    }
    return (
        <Link href={"/login"}
              className={clsx(
                  "c-button", "h-10",
                  "px-3", "sm:order-1",
                  "font-bold", "text-sm", "text-gray-900", "hover:text-gray-950",
                  "bg-colour-accent-primary", "hover:bg-colour-accent-secondary",
                  "u-ring-primary", "u-transition",
              )}>
            <p>Login</p>
        </Link>
    );
}
