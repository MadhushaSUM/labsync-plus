
import { fetchInvestigationData } from '@/services/investigationDataAPI';
import { useState, useEffect } from 'react';

const useGetInvestigationData = (investigationRegisterId: number, investigationId: number) => {
    const [data, setData] = useState<Object | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const loadInvestigationData = async () => {
            if (!investigationRegisterId || !investigationId) {
                setLoading(false);
                return;
            }
            console.log(`investigationRegisterId: ${investigationRegisterId}`);
            console.log(`investigationId: ${investigationId}`);

            setLoading(true);
            try {
                const investigationData = await fetchInvestigationData(investigationRegisterId, investigationId, signal);
                setData(investigationData);
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    setError(error);
                }
            } finally {
                setLoading(false);
            }
        };

        loadInvestigationData();

        return () => controller.abort();
    }, [investigationRegisterId, investigationId]);

    return { data, loading, error };
};

export default useGetInvestigationData;
