"use server";

import { cookies } from "next/headers";

export async function createUpload(formData: FormData): Promise<any> {
    const response = await fetch(
        "http://localhost/api/users/me/uploads",
        {
            method: "POST",
            headers: {
                "Authorization": `${cookies().get("__token")?.value}`,
            },
            body: formData,
        },
    );
    if (!response.ok) {
        return { message: (await response.json()).reason };
    }
    return await response.json();
}
