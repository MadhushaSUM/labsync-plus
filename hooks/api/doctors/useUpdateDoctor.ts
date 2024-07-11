import { useState } from 'react';
import { updateDoctor } from '@/services/api';
import { DoctorType } from '@/types/entity/doctor';

const useUpdateDoctor = () => {
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
    const [errorUpdate, setErrorUpdate] = useState<Error | null>(null);

    const updateExistingDoctor = async (doctorId: number, doctorData: DoctorType, signal?: AbortSignal) => {
        setLoadingUpdate(true);
        try {
            const updatedDoctor = await updateDoctor(doctorId, doctorData, signal);
            return updatedDoctor;
        } catch (error: any) {
            setErrorUpdate(error);
        } finally {
            setLoadingUpdate(false);
        }
    };

    return { updateExistingDoctor, loadingUpdate, errorUpdate };
};

export default useUpdateDoctor;
