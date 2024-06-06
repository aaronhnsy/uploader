"use server";

import { cookies } from "next/headers";

export interface User {
    id: string,
    username: string,
    bot: boolean,
    permissions: number,
    profile_picture: string,
    upload_count: number,
}

export async function getUser(): Promise<User | null> {
    const response = await fetch(
        "http://localhost/api/users/me",
        {
            method: "GET",
            headers: {"Authorization": `${cookies().get("__token")?.value}`},
            next: {revalidate: 10},
        }
    );
    if (response.ok) {
        return await response.json();
    } else {
        console.log(await response.json());
        return null;
    }
}
