"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <div className="flex flex-col justify-center items-center mt-5 gap-2">
            LABSYNC-PLUS
            <div>
                <Button 
                    variant="outlined"
                    onClick={() => router.push("/dashboard")}
                >
                    Click Me!
                </Button>
            </div>
        </div>      
    );
}
