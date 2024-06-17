import { fetchPatientInvestigationData } from '@/services/investigationDataAPI';
import { PatientAnalysisDataRequestDto } from '@/types/Dto/InvestigationData';
import { investigationData } from '@/types/entity/InvestigationData';
import { debounce } from 'lodash';
import { useState, useEffect, useCallback } from 'react';

const useGetInvestigationDataAnalysis = () => {
    const [data, setData] = useState<investigationData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [searchPatientAnalysisQuery, setSearchPatientAnalysisQuery] = useState<PatientAnalysisDataRequestDto | null>(null);

    const searchPatients = useCallback(
        debounce(async (query: PatientAnalysisDataRequestDto, signal: AbortSignal) => {
            setLoading(true);
            try {
                const patients = await fetchPatientInvestigationData(query, signal);
                console.log(patients);
                
                setData(patients);
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

        if (searchPatientAnalysisQuery) {
            searchPatients(searchPatientAnalysisQuery, signal);
        }

        return () => controller.abort();
    }, [searchPatientAnalysisQuery, searchPatients]);

    return { data, setData, loading, error, searchPatientAnalysisQuery, setSearchPatientAnalysisQuery };
};

export default useGetInvestigationDataAnalysis;