
import { useState } from 'react';
import { addPatient } from '@/services/api';
import { PatientType } from '@/types/entity/patient';

const useAddPatient = () => {
    const [loadingAdd, setLoadingAdd] = useState<boolean>(true);
    const [errorAdd, setErrorAdd] = useState<Error | null>(null);

    const createNewPatient = async (patientData: PatientType) => {
        setLoadingAdd(true);
        try {
            const newPatient = await addPatient(patientData);
            return newPatient; // Return the created patient
        } catch (error: any) {
            setErrorAdd(error);
        } finally {
            setLoadingAdd(false);
        }
    };

    return { createNewPatient, loadingAdd, errorAdd };
};


export default useAddPatient;
