import { getUser } from "@/actions/getUser";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

export async function HeaderAccount() {
    let user = await getUser();
    if (user !== null) {
        return (
            <Link href={"/account"}
                  className={clsx(
                      "flex", "items-center", "justify-center", "rounded",
                      "h-10", "ps-2", "pe-1", "space-x-2", "sm:order-1",
                      "bg-colour-main-200", "hover:bg-colour-main-300",
                      "text-colour-text", "hover:text-colour-text-hover",
                      "text-size-7",
                      "transitions",
                  )}>
                <p>{user.username}</p>
                <Image className={clsx("rounded")} width="32" height="32"
                       src={user.profile_picture} alt={"current user profile picture"}/>
            </Link>
        );
    }
    return (
        <Link href={"/login"}
              className={clsx(
                  "flex", "items-center", "justify-center", "rounded",
                  "h-10", "px-2", "sm:order-1",
                  "bg-colour-accent", "hover:bg-colour-accent-hover",
                  "text-gray-800", "hover:text-gray-900",
                  "text-size-8",
                  "transitions",
              )}>
            <p>Login</p>
        </Link>
    );
}
