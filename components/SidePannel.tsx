"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";



const SidePannel = () => {

    const { data:session } = useSession();
    const router = useRouter();

    const handleClicks = (e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.id === "newTestBtn") {
            router.push("/addselectpatient");            
        }
    }

    if (session?.user) {
        return (
            <div className='flex flex-initial w-60 bg-blue-300'>
                <div className="h-screen w-full flex flex-col gap-5 items-end">
                    <button id="newTestBtn" onClick={handleClicks} className="sidePanelButton">
                        <span className="">
                            New Test
                        </span>
                    </button>
                    <button id="newPatientBtn" onClick={handleClicks} className="sidePanelButton">
                        <span>
                            New Patient
                        </span>
                    </button>
                    <button id="newDoctorBtn" onClick={handleClicks} className="sidePanelButton">
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