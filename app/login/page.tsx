import Image from "next/image"
import LoginForm from "../../components/LoginForm"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthOptions } from "../api/auth/[...nextauth]/route";

const page = async () => {
    const session = await getServerSession(AuthOptions);

    if (session) {
        redirect("/")
    }

    return (
        <main>
            <LoginForm/>
        </main>
    )
}

export default page