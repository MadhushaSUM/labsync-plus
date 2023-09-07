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
                    
                    <button className="border-2 rounded-full border-blue-400 w-fit" onClick={() => signOut()}>
                        <h1 className="px-2 font-semibold text-lg text-white">Sign Out</h1>
                    </button>
                </div>
            }
        </div>
    )
}

export default Navbar