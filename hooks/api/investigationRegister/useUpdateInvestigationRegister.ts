import { updateInvestigationRegistrations } from '@/services/investigationRegistrationAPI';
import { NewInvestigationRegistryRequestDtoType } from '@/types/Dto/InvestigationRegistryDto';
import { useState } from 'react';

const useUpdateInvestigationRegister = () => {
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
    const [errorUpdate, setErrorUpdate] = useState<Error | null>(null);

    const updateExistingInvestigationRegister = async (investigationRegisterId: number, investigationRegisterData: NewInvestigationRegistryRequestDtoType, signal?: AbortSignal) => {
        setLoadingUpdate(true);
        try {
            const updatedPatient = await updateInvestigationRegistrations(investigationRegisterId, investigationRegisterData, signal);
            return updatedPatient;
        } catch (error: any) {
            setErrorUpdate(error);
        } finally {
            setLoadingUpdate(false);
        }
    };

    return { updateExistingInvestigationRegister, loadingUpdate, errorUpdate };
};

export default useUpdateInvestigationRegister;
