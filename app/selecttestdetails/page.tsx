"use client";

import { useContext, useState } from "react";
import { SelectedPatientContext } from "../context/SelectedPatientContext";
import { Switch } from '@headlessui/react';

const SelectTestDetails = () => {

    const { selectedPatient, setSelectedPatient } = useContext(SelectedPatientContext);
    const [ fbs, setFbs ] = useState(false);


    return (
        <div className="m-5">
            <div className="flex flex-col gap-5">
                <div className="border border-black rounded-xl bg-gray-50 w-80 ">
                    <div className="p-2">
                        <h1 className="text-xl font-bold text-center">Selected Patient</h1>

                        <p>
                            <span className="font-bold text-sm">Patient Name: </span>
                            {selectedPatient.name}
                        </p>

                        <p>
                            <span className="font-bold text-sm">Age: </span>
                            ***
                        </p>
                    </div>
                </div>

                <div className="border border-black rounded-xl bg-gray-50 w-80 ">
                    <div className="p-2">
                        <h1 className="text-xl font-bold text-center">Select Tests</h1>

                        <div className="flex flex-row gap-5 items-center">
                            <span>FBS </span>

                            <Switch
                                checked={fbs}
                                onChange={setFbs}
                                className={`${fbs ? 'bg-blue-500' : 'bg-blue-300'} relative inline-flex h-[28px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                                <span className="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    className={`${fbs ? 'translate-x-7' : 'translate-x-0'} pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                            </Switch>
                        </div>

                    </div>

                </div>

                <div className="border border-black rounded-xl bg-gray-50 w-80 ">
                    <div className="p-2 flex flex-col items-center">
                        <h1 className="text-xl font-bold text-center">Requested Doctor</h1>

                        <input className="w-72" type="text" />
                    </div>
                </div>

                <button className="bg-blue-500 w-20 rounded-full p-1">Save</button>            
            </div>            
        </div>
    )
}

export default SelectTestDetails