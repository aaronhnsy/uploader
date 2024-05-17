"use server";

import { cookies } from "next/headers";

export type File = {
    user_id: string;
    id: string;
    filename: string;
    created_at: string;
    public: boolean;
    tags: string[];
}

export async function getFiles(): Promise<File[]> {
    const response = await fetch(
        "http://localhost/api/users/me/uploads",
        {
            method: "GET",
            headers: {"Authorization": `${cookies().get("__token")?.value}`},
            next: {revalidate: 10},
        });
    return await response.json();
}
