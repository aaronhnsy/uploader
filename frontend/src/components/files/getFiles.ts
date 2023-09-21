"use server";

export type File = {
    user_id: string;
    name: string;
    format: string;
    private: boolean;
}

export async function getFiles(): Promise<File[]> {
    const response = await fetch("http://127.0.0.1:12345/api/files", {
        method: "GET",
        headers: {"Authorization": "0cf429d46c83497b86a47215aba566d9AAAAAAAAAAAA"},
        next: {revalidate: 10},
    });
    return response.json();
}
