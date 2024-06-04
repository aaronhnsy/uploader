import { getUser } from "@/actions/getUser";
import { LoginForm } from "@/components/login";
import { redirect } from "next/navigation";

export default async function Page() {
    const user = await getUser();
    if (user !== null) {
        redirect("/");
    } else {
        return (
            <LoginForm/>
        );
    }
}
