import { fetchTestAnalysisOverview } from '@/services/investigationDataAPI';
import { TestAnalysisDataRequestDto } from '@/types/Dto/InvestigationData';
import { investigationData } from '@/types/entity/InvestigationData';
import { debounce } from 'lodash';
import { useState, useEffect, useCallback } from 'react';

const useGetTestAnalysisData = () => {
    const [data, setData] = useState<investigationData[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [searchTestAnalysisQuery, setSearchTestAnalysisQuery] = useState<TestAnalysisDataRequestDto | null>(null);

    const searchTestAnalysis = useCallback(
        debounce(async (query: TestAnalysisDataRequestDto, signal: AbortSignal) => {
            setLoading(true);
            try {
                const patientsData = await fetchTestAnalysisOverview(query, signal);                
                setData(patientsData);
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    setError(error);
                }
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        if (searchTestAnalysisQuery) {
            searchTestAnalysis(searchTestAnalysisQuery, signal);
        }

        return () => controller.abort();
    }, [searchTestAnalysisQuery, searchTestAnalysis]);

    return { data, setData, loading, error, searchTestAnalysisQuery, setSearchTestAnalysisQuery };
};

export default useGetTestAnalysisData;