import { useUser } from "@/hooks/useUser";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

export async function HeaderAccountButton() {
    let user = await useUser();
    if (user !== null) {
        return (
            <Link href={"/account"}
                  className={clsx(
                      "flex", "items-center", "justify-center", "rounded",
                      "h-10", "px-2", "space-x-2", "sm:order-1",
                      "bg-theme-secondary", "hover:bg-theme-secondary-hover",
                      "text-theme-text", "hover:text-theme-text-hover",
                      "font-bold", "text-base",
                      "u-transition",
                  )}>
                <Image className={clsx("w-8", "h-8", "rounded-full")} width="32" height="32"
                       src={user.profile_picture} alt={"profile picture"}/>
                <p>{user.name}</p>
            </Link>
        );
    }
    return (
        <Link href={"/login"}
              className={clsx(
                  "flex", "items-center", "justify-center", "rounded",
                  "h-10", "px-2", "sm:order-1",
                  "bg-theme-accent", "hover:bg-theme-accent-hover",
                  "text-gray-800", "hover:text-gray-900",
                  "font-bold", "text-sm",
                  "u-transition",
              )}>
            <p>Login</p>
        </Link>
    );
}
