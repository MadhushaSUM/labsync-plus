"use client";

import { NextUIProvider } from "@nextui-org/react";
import Navbar from "./Navbar"
import SidePannel from "./SidePannel"


const LabSync = ({children}) => {
    return (
        <div>
            <NextUIProvider>
                <Navbar />
                <div className='flex flex-row'>
                    <div>
                        <SidePannel />
                    </div>

                    <div className='flex-1'>
                        {children}
                    </div>
                </div>
            </NextUIProvider>
        </div>
    )
}

export default LabSync