import {cookies} from "next/headers";

export type File = {
    user_id: string;
    filename: string;
}

export async function getFiles(): Promise<File[]> {
    const response = await fetch(
        "http://127.0.0.1:10010/api/users/me/uploads",
        {
            method: "GET",
            headers: {"Authorization": `${cookies().get("__token")?.value}`},
            next: {revalidate: 10},
        });
    return response.json();
}
