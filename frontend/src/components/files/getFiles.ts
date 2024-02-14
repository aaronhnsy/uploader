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
        headers: {"Authorization": process.env.UPLOADER_TOKEN as string},
        next: {revalidate: 10},
    });
    return response.json();
}
