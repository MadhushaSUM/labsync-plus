"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
            setError("All fields are required!");
            return;
        }

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            
            if (res?.error) {
                setError("Invalid credentials!");
                return;                               
            }

            router.replace("/");
        } catch (error) {
            console.log("Error during login : ", error);   
        }
    };


    return (
        <div className="grid place-items-center h-screen bg-blue-100">
            <div className="shadow-lg p-5 rounded-lg border-l-4 border-t-4 border-blue-400">
                
                <div className="flex justify-center">
                    <Image src="/LabSync-logo.png" height={200} width={200} alt="LabSync-logo" />
                </div>
                
                <h1 className="text-xl text-center font-bold my-4">Login</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input type="text" placeholder="Email" onChange={ (e) => setEmail(e.target.value) }/>
                    <input type="password" placeholder="Password" onChange={ (e) => setPassword(e.target.value) }/>
                    <button className="bg-blue-300 text-white font-bold cursor-pointer px-6 py-2 rounded-xl">Login</button>
                </form>

                {error && 
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{ error }</div>
                }

                <div className="flex justify-end">
                    <Link className="text-sm mt-3 text-right w-fit" href={"/register"}>
                        Don't have an account? 
                    <span className="underline">Register</span> 
                    </Link>
                </div>
            </div>
            

        </div>
    )
}

export default LoginForm