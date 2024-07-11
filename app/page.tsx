import { Button } from "@/components/ui/button";


export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center mt-5 gap-2">
            LABSYNC-PLUS
            <div>
                <Button 
                    variant={"outline"}
                >
                    Click Me!
                </Button>
            </div>
        </div>      
    );
}
