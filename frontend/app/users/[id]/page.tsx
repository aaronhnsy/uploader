export default function Page(
    {params}: { params: { id: number } },
) {
    return <h1>hi user {params.id}</h1>;
}