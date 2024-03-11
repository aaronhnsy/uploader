import { cookies } from "next/headers";

export async function useSession() {
    let sessionId = cookies().get("__session_id");
    if (sessionId === undefined) {
        return null;
    }
    const response = await fetch(
        "http://localhost:8000/api/users/@me",
        {
            method: "GET",
            headers: {Cookie: cookies().toString()},
        },
    );
    if (response.ok) {
        return await response.json();
    } else {
        console.log(await response.json());
        return null;
    }
}
