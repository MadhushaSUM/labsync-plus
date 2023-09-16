"use client";

import { useState, useEffect } from 'react';
import AutoCompleteText from "@/components/AutoCompleteText";
import { Switch } from '@headlessui/react';


const AddNewTest = () => { 

    const [allPatients, setAllPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(allPatients[0]);

    const [allDoctors, setAllDoctors] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(allDoctors[0]);

    const [ fbs, setFbs ] = useState(false);

    const loadPatients = async () => {
        try {
            const res = await fetch("/api/getpatient", {
                method:"GET",
            }) 
            const { patients } = await res.json(); 
            setAllPatients(patients);                
        } catch (error) {
            console.log(error);                
        }   
    }

    const loadDoctors = async () => {
        try {
            const res = await fetch("/api/doctors/getall", {
                method:"GET",
            }) 
            const { doctors } = await res.json(); 
            setAllDoctors(doctors)                
        } catch (error) {
            console.log(error);                
        }  
    }

    useEffect(() => {
        loadPatients();
        loadDoctors();
    },[]);

    return (
        <div className="m-5">
            <h2> Select Patient: </h2>

            <AutoCompleteText 
                selected={selectedPatient} 
                setSelected={setSelectedPatient}
                nothingFoundText={"No patients found."} 
                data={allPatients}
            /> 

            <h2> Select Requested Doctor: </h2>

            <AutoCompleteText 
                selected={selectedDoc} 
                setSelected={setSelectedDoc}
                nothingFoundText={"No Doctors found."} 
                data={allDoctors}
            />  


            <div className="flex flex-row gap-5 items-center pt-5">
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

            <button className="bg-blue-500 w-20 rounded-full p-1 mt-5">Save</button>         
        </div>
    )
}

export default AddNewTest