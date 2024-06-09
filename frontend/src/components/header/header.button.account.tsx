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
                      "bg-colour-secondary", "hover:bg-colour-secondary-hover",
                      "text-colour-text", "hover:text-colour-text-hover",
                      "text-size-7",
                      "transitions",
                  )}>
                <Image className={clsx("rounded")} width="32" height="32"
                       src={user.profile_picture} alt={"current user profile picture"}/>
                <p>{user.username}</p>
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
