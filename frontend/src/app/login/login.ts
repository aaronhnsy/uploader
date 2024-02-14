"use server";


export async function login(formData: FormData) {
    const data = await fetch(
        "http://localhost:12345/api/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.get("email"),
                password: formData.get("password")
            }),
        }
    )
    console.log(await data.json());
}
