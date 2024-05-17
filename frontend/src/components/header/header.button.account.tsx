import { getUser } from "@/actions/getUser";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

export async function HeaderAccountButton() {
    let user = await getUser();
    if (user !== null) {
        return (
            <Link href={"/account"}
                  className={clsx(
                      "flex", "items-center", "justify-center", "rounded",
                      "h-10", "ps-1", "pe-2", "space-x-2", "sm:order-1",
                      "bg-transparent", "hover:bg-theme-primary-hover",
                      "text-theme-text", "hover:text-theme-text-hover",
                      "font-bold", "text-base",
                      "cu-transition",
                  )}>
                <Image className={clsx("rounded")} width="32" height="32"
                       src={user.profile_picture} alt={"Profile picture for current user."}/>
                <p>{user.username}</p>
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
                  "cu-transition",
              )}>
            <p>Login</p>
        </Link>
    );
}
