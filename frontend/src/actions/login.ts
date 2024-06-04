"use server";

import { cookies } from "next/headers";

interface TokenResponse {
    token: string;
}

export async function login(formData: FormData): Promise<undefined> {
    const response = await fetch(
        "http://localhost/api/tokens",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: formData.get("username"),
                password: formData.get("password"),
                detail: "Web Login",
            }),
        },
    );
    if (response.ok) {
        const data: TokenResponse = await response.json();
        cookies().set({
            name: "__token",
            value: data.token,
        });
    } else {
        console.log(await response.json());
    }
}
