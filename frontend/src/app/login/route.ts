import * as crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
    const state = crypto.randomBytes(16).toString("hex");
    cookies().set("state", state, {httpOnly: true});
    redirect(
        `https://discord.com/api/oauth2/authorize?` +
        `client_id=${process.env.DISCORD_CLIENT_ID}&` +
        `response_type=code` +
        `&scope=identify&` +
        `redirect_uri=${process.env.DISCORD_REDIRECT_URI}&` +
        `state=${state}`,
    );
}