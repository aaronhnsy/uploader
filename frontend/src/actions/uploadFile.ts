"use server";

import { cookies } from "next/headers";

export async function uploadFile(previousState: any, formData: FormData): Promise<any> {
    const form = new FormData();
    form.append("file", formData.get("file") as Blob);
    console.log(form)
    const response = await fetch(
        "http://localhost/api/users/me/uploads",
        {
            method: "POST",
            headers: {
                "Authorization": `${cookies().get("__token")?.value}`,
                "Content-Type": "multipart/form-data",
            },
            body: form,
        },
    );
    if (!response.ok) {
        return { message: (await response.json()).reason };
    }
    return await response.json();
}
