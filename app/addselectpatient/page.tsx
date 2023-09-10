"use client";

import SearchResultList from '@/components/SearchResultList';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddSelectPatient = () => {

    const [results, setResults] = useState([]);
    const router = useRouter();

    const handleChange = async (e) => {

        if (e.target.value.length === 0) {
            setResults([]);
            return;            
        }

        try {
            const res = await fetch("/api/patients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    patientname: e.target.value,
                }),
            });
            
            if (res.ok) {
                const { patients } = await res.json();
                console.log(patients);
                
                setResults(patients);                               
            } 

        } catch (error) {
            console.log("Error during retrieving patient names : ", error);
        }
    };

    return (
        <div className="flex flex-col justify-center pt-5 pl-5">
            <h1 className="font-bold text-3xl">Select / Add Patient</h1>

            <form className="flex flex-col gap-2 pt-5">
                <div>
                    <h2 className="font-semibold">Name</h2>
                    <input type="text" placeholder='Type to search...' onChange={handleChange}/>
                </div>

                <SearchResultList list={results}/>

            </form>
        </div>
    )
}

export default AddSelectPatient