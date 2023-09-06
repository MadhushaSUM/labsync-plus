import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthOptions } from "../api/auth/[...nextauth]/route";

const Register = async () => {
  const session = await getServerSession(AuthOptions);

  if (session) {
      redirect("/")
  }

  return (
    <RegisterForm />
  )
}

export default Register