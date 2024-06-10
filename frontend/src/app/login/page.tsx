import { getUser } from "@/actions/getUser";
import { LoginForm } from "@/components/loginForm";
import { redirect } from "next/navigation";

export default async function Page() {
    const user = await getUser();
    if (user !== null) {
        redirect("/");
    }
    else {
        return (
            <LoginForm/>
        );
    }
}
