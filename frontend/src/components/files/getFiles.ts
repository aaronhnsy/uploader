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
        headers: {"Authorization": "dfbjdasvbuwgb43jwrefbcvbj4wbgjkerbdq0-9we3r9013-0udfh"},
        next: {revalidate: 10},
    });
    return response.json();
}
