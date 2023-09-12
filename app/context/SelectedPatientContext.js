"use client";

import { useState, createContext } from "react";

export const SelectedPatientContext = createContext();

export const SelectedPatientContextProvider = ({ children }) => {
    const [selectedPatient, setSelectedPatient] = useState({
        name:"",
    });

    return (
        <SelectedPatientContext.Provider value={{ selectedPatient, setSelectedPatient }}>
            {children}
        </SelectedPatientContext.Provider>
    )
};