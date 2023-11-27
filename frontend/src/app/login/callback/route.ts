import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    if (cookies().get("state")?.value !== request.nextUrl.searchParams.get("state")) {
        redirect("/login/error/invalid-state");
    }
    cookies().delete("state");

    const code = request.nextUrl.searchParams.get("code");
    if (!code) {
        redirect("/login/error/invalid-code");
    }

    const data = await fetch(
        "https://discord.com/api/oauth2/token",
        {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: new URLSearchParams({
                client_id: process.env.DISCORD_CLIENT_ID as string,
                client_secret: process.env.DISCORD_CLIENT_SECRET as string,
                redirect_uri: process.env.DISCORD_REDIRECT_URI as string,
                grant_type: "authorization_code",
                scope: "identify",
                code: code,
            }),
        },
    );
    console.log(await data.json());

    return new NextResponse();
}