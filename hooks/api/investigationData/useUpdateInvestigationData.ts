import { useState } from 'react';
import { UpdateInvestigationDataRequestDto } from '@/types/Dto/InvestigationData';
import { updateInvestigationData } from '@/services/investigationRegistrationAPI';

const useUpdateInvestigationData = () => {
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
    const [errorUpdate, setErrorUpdate] = useState<Error | null>(null);

    const updateExistingInvestigationData = async (updatingData: UpdateInvestigationDataRequestDto) => {
        setLoadingUpdate(true);
        try {
            const res = await updateInvestigationData(updatingData);
            return res;
        } catch (error: any) {
            setErrorUpdate(error);
        } finally {
            setLoadingUpdate(false);
        }
    };

    return { updateExistingInvestigationData, loadingUpdate, errorUpdate };
};

export default useUpdateInvestigationData;
