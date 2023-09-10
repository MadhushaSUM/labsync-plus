"use client";

import { signOut, useSession } from "next-auth/react"

const Navbar = () => {
    
    const { data:session } = useSession();

    return (
        <div className="bg-blue-300 h-10 flex items-center justify-between">
            <h1 className="pl-3 font-black text-2xl text-white">LabSync Plus</h1>
            
            {session?.user && 
                <div className="flex gap-5 items-center">
                    <h3><span>Welcome </span>{session?.user?.username}</h3>
                    
                    <button className=" rounded-full bg-blue-500 w-fit" onClick={() => signOut()}>
                        <h1 className="px-2 font-semibold text-white p-1">Sign Out</h1>
                    </button>
                </div>
            }
        </div>
    )
}

export default Navbar