import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import { useUser } from "@/hooks/useUser";

export async function HeaderAccountButton() {
    let user = await useUser();
    if (user !== null) {
        return (
            <Link href={"/account"}
                  className={clsx(
                      "c-button", "h-10",
                      "px-3", "space-x-3", "mr-3", "sm:order-1",
                      "bg-theme-secondary", "hover:bg-theme-secondary-hover",
                      "font-bold", "text-md",
                      "text-theme-text", "hover:text-theme-text-hover",
                      "u-transition",
                  )}>
                <Image className={clsx("rounded-full")} src={user.profile_picture} alt={"profile picture"} width="32" height="32"></Image>
                <p>{user.name}</p>
            </Link>
        );
    }
    return (
        <Link href={"/login"}
              className={clsx(
                  "c-button", "h-10",
                  "px-3", "sm:order-1",
                  "bg-theme-accent", "hover:bg-theme-accent-hover",
                  "font-bold", "text-sm",
                  "text-gray-800", "hover:text-gray-900",
                  "u-transition",
              )}>
            <p>Login</p>
        </Link>
    );
}
