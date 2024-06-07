import { addInvestigationData } from '@/services/investigationRegistrationAPI';
import { AddInvestigationDataRequestDto } from '@/types/Dto/InvestigationData';
import { useState } from 'react';

const useAddInvestigationData = () => {
    const [loadingAdd, setLoadingAdd] = useState<boolean>(true);
    const [errorAdd, setErrorAdd] = useState<Error | null>(null);

    const saveInvestigationData = async (investigationData: AddInvestigationDataRequestDto) => {
        setLoadingAdd(true);
        try {
            const newData = await addInvestigationData(investigationData);
            return newData;
        } catch (error: any) {            
            setErrorAdd(error);
        } finally {
            setLoadingAdd(false);
        }
    };

    return { saveInvestigationData, loadingAdd, errorAdd };
};


export default useAddInvestigationData;
