import { cookies } from "next/headers";

export async function useUser() {
    let token = cookies().get("__token");
    if (token === undefined) {
        return null;
    }
    const response = await fetch(
        "http://localhost:8000/api/users/me",
        {
            method: "GET",
            headers: {"Authorization": `${token.value}`},
        },
    );
    if (response.ok) {
        return await response.json();
    } else {
        console.log(await response.json());
        return null;
    }
}
