
import { addInvestigationRegistrations } from '@/services/investigationRegistrationAPI';
import { NewInvestigationRegistryRequestDtoType } from '@/types/Dto/InvestigationRegistryDto';
import { useState } from 'react';

const useAddInvestigationRegister = () => {
    const [loadingAdd, setLoadingAdd] = useState<boolean>(true);
    const [errorAdd, setErrorAdd] = useState<Error | null>(null);

    const createNewInvestigationRegister = async (investigationRegister: NewInvestigationRegistryRequestDtoType) => {
        setLoadingAdd(true);
        try {
            const newPatient = await addInvestigationRegistrations(investigationRegister);
            return newPatient; // Return the created patient
        } catch (error: any) {            
            setErrorAdd(error);
        } finally {
            setLoadingAdd(false);
        }
    };

    return { createNewInvestigationRegister, loadingAdd, errorAdd };
};


export default useAddInvestigationRegister;
