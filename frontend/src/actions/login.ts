"use server";

import { cookies } from "next/headers";
import { z } from "zod";

const loginSchema = z.object({
    username: z.string()
        .min(1, { message: "Username should not be empty." })
        .max(32, { message: "Username should be 32 characters or less." }),
    password: z.string()
        .min(1, { message: "Password should not be empty." }),
});

export async function login(previousState: any, formData: FormData): Promise<any> {
    // validate the form data
    const validationResult = loginSchema.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
    });
    if (!validationResult.success) {
        return { message: validationResult.error.errors[0].message };
    }
    // send the login request
    const response = await fetch(
        "http://localhost/api/tokens",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: validationResult.data.username,
                password: validationResult.data.password,
                detail: "Web Login",
            }),
        },
    );
    if (!response.ok) {
        return { message: (await response.json()).reason };
    }
    cookies().set({
        name: "__token",
        value: (await response.json()).token,
        maxAge: 60 * 60 * 24 * 31,
        expires: 60 * 60 * 24 * 31,
        secure: true,
        httpOnly: true,
        sameSite: "strict",
        path: "/",
    });
}
