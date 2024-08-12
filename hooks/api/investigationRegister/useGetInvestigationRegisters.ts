
import { useState, useEffect } from 'react';
import { Page } from '@/types/Dto/CommonNetworkTypes';
import { InvestigationRegistryRequestDtoType } from '@/types/Dto/InvestigationRegistryDto';
import { InvestigationRegisterType } from '@/types/entity/investigationRegister';
import { fetchInvestigationRegistrations } from '@/services/investigationRegistrationAPI';

const useGetInvestigationRegisters = ({ limit, offset }: InvestigationRegistryRequestDtoType) => {
    const [data, setData] = useState<Page<InvestigationRegisterType>>({ content: [], totalPages: 0, totalElements: 0 });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);    

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const loadInvestigationRegisters = async () => {
            setLoading(true);
            try {
                const investigationRegisters = await fetchInvestigationRegistrations({ limit, offset }, signal);
                setData(investigationRegisters);
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    setError(error);
                }
            } finally {
                setLoading(false);
            }
        };

        loadInvestigationRegisters();

        return () => controller.abort();
    }, [limit, offset]);

    return { data, loading, error };
};

export default useGetInvestigationRegisters;
