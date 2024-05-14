import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, userAgent } from "next/server";

export async function POST(request: NextRequest) {
    let formData = await request.formData();
    let {browser, device, engine, os} = userAgent(request);
    let requestBody = {
        username: formData.get("username"),
        password: formData.get("password"),
        detail: `Browser: ${browser.name} ${browser.version}, Device: ${device.type}, Engine: ${engine.name} ${engine.version}, OS: ${os.name} ${os.version}`,
    };
    const response = await fetch(
        "http://127.0.0.1:10010/api/tokens",
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
