import { NextRequest, userAgent } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
    let formData = await request.formData();
    let {browser, device, engine, os} = userAgent(request);
    let requestBody = {
        username: formData.get("username"),
        password: formData.get("password"),
        detail: `Browser: ${browser.name} ${browser.version}, Device: ${device.type}, Engine: ${engine.name} ${engine.version}, OS: ${os.name} ${os.version}`,
    };
    const response = await fetch(
        "http://localhost:8000/api/tokens",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestBody),
        },
    );
    if (response.ok) {
        const data = await response.json();
        cookies().set({
            name: "__token",
            value: data.token,
            maxAge: 60 * 60 * 24 * 30,
            expires: 60 * 60 * 24 * 30,
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
