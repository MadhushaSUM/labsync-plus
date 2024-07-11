
import { useState } from 'react';
import { addDoctor } from '@/services/api';
import { DoctorType } from '@/types/entity/doctor';

const useAddDoctor = () => {
    const [loadingAdd, setLoadingAdd] = useState<boolean>(true);
    const [errorAdd, setErrorAdd] = useState<Error | null>(null);

    const createNewDoctor = async (doctorData: DoctorType) => {
        setLoadingAdd(true);
        try {
            const newDoctor = await addDoctor(doctorData);
            return newDoctor; // Return the created patient
        } catch (error: any) {
            setErrorAdd(error);
        } finally {
            setLoadingAdd(false);
        }
    };

    return { createNewDoctor, loadingAdd, errorAdd };
};


export default useAddDoctor;
