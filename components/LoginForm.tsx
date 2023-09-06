"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            
            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/");                               
            } else {
                const { message } = await res.json();
                setError(message);                
            }
        } catch (error) {
            console.log("Error during login : ", error);   
        }
    }


    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">Login</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input type="text" placeholder="Email" onChange={ (e) => setEmail(e.target.value) }/>
                    <input type="password" placeholder="Password" onChange={ (e) => setPassword(e.target.value) }/>
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">Login</button>
                </form>

                {error && 
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{ error }</div>
                }

                <Link className="text-sm mt-3 text-right" href={"/register"}>
                    Don't have an account? 
                <span className="underline">Register</span> 
                </Link>
            </div>
            

        </div>
    )
}

export default LoginForm