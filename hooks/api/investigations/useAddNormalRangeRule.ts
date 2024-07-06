
import { addNormalRanges } from '@/services/investigationAPI';
import { NormalRangesDto } from '@/types/commonTypes';
import { useState } from 'react';

const useAddNormalRangeRule = () => {
    const [loadingAdd, setLoadingAdd] = useState<boolean>(true);
    const [errorAdd, setErrorAdd] = useState<Error | null>(null);

    const addNormalRangeRule = async (normalRangeRule: NormalRangesDto) => {
        setLoadingAdd(true);
        try {
            const response = await addNormalRanges(normalRangeRule);
            return response;
        } catch (error: any) {            
            setErrorAdd(error);
        } finally {
            setLoadingAdd(false);
        }
    };

    return { addNormalRangeRule, loadingAdd, errorAdd };
};


export default useAddNormalRangeRule;
