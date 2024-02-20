"use server";

import { cookies } from "next/headers";

export async function login(formData: FormData) {
    const response = await fetch(
        "http://localhost:10000/api/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.get("email"),
                password: formData.get("password"),
            }),
        },
    );
    if (response.ok) {
        const data = await response.json();
        cookies().set({
            name: "token",
            value: data.token,
            path: "/",
            sameSite: "strict",
            httpOnly: true,
        });
    } else {

    }
}
