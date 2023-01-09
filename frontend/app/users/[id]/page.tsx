export default function Page(
    {params}: { params: { id: number } },
) {
    return <h1>user: {params.id}</h1>;
}