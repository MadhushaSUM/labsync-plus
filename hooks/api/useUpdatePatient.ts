import { useState } from 'react';
import { updatePatient } from '@/services/api';
import { PatientType } from '@/types/entity/patient'; 

const useUpdatePatient = () => {
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
    const [errorUpdate, setErrorUpdate] = useState<Error | null>(null);

    const updateExistingPatient = async (patientId: string, patientData: PatientType, signal?: AbortSignal) => {
        setLoadingUpdate(true);
        try {
            const updatedPatient = await updatePatient(patientId, patientData, signal);
            return updatedPatient;
        } catch (error: any) {
            setErrorUpdate(error);
        } finally {
            setLoadingUpdate(false);
        }
    };

    return { updateExistingPatient, loadingUpdate, errorUpdate };
};

export default useUpdatePatient;
