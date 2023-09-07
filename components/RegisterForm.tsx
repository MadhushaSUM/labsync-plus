"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are required!");
            return;
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: name,
                    email: email,
                    password: password,
                }),
            });
            
            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/login");                               
            } else {
                const { message } = await res.json();
                setError(message);                
            }

        } catch (error) {
            console.log("Error during registration : ", error);
            
        }
    };

    return (
        <div className="grid place-items-center h-screen bg-blue-100">
            <div className="shadow-lg p-5 rounded-lg border-l-4 border-t-4 border-blue-400">
                
                <div className="flex justify-center">
                    <Image src="/LabSync-logo.png" height={200} width={200} alt="LabSync-logo" />
                </div>
                <h1 className="text-xl text-center font-bold my-4">Register</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input type="text" placeholder="Full Name" onChange={ (e) => setName(e.target.value)}/>
                    <input type="text" placeholder="Email" onChange={ (e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={ (e) => setPassword(e.target.value)} />
                    <button className="bg-blue-300 text-white font-bold cursor-pointer px-6 py-2 rounded-xl">Register</button>
                </form>

                { error &&
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>
                }

                <div className="flex justify-end">
                    <Link className="text-sm mt-3" href={"/login"}>
                        Already have an account? 
                    <span className="underline">Login</span> 
                    </Link>
                </div>
            </div>
        </div>
    )
}