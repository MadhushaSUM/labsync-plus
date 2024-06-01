
import { useState } from 'react';
import { addPatient } from '@/services/api';
import { PatientType } from '@/types/entity/patient';

const useAddPatient = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const createNewPatient = async (patientData: PatientType) => {
        setLoading(true);
        try {
            const newPatient = await addPatient(patientData);
            return newPatient; // Return the created patient
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { createNewPatient, loading, error };
};


export default useAddPatient;
