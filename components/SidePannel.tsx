"use client";

import { useSession } from "next-auth/react";



const SidePannel = () => {

    const { data:session } = useSession();

    if (session?.user) {
        return (
            <div className='flex flex-initial w-60 bg-blue-300'>
                <div className="h-screen w-full flex flex-col gap-5 items-end">
                    <button className="bg-blue-500 w-40 rounded-l-full p-2">
                        <span className="">
                            New Test
                        </span>
                    </button>
                    <button className="bg-blue-500 w-40 rounded-l-full p-2">
                        <span>
                            New Patient
                        </span>
                    </button>
                    <button className="bg-blue-500 w-40 rounded-l-full p-2">
                        <span>
                            New Doctor
                        </span>
                    </button>

                </div>
            </div>
        )
    }
}

export default SidePannel