"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const response = await fetch(
        "http://localhost:8000/api/sessions",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: formData.get("username"),
                password: formData.get("password"),
            }),
        },
    );
    if (response.ok) {
        const data = await response.json();
        cookies().set({
            name: "__session_id",
            value: data.session_id,
            maxAge: 60 * 60 * 24 * 14,
            expires: 60 * 60 * 24 * 14,
            secure: true,
            httpOnly: true,
            sameSite: "strict",
            path: "/",
        });
        redirect("/");
    } else {
        console.log(await response.json());
    }
}
