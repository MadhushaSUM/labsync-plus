import { fetchPatientInvestigationData } from '@/services/investigationDataAPI';
import { PatientAnalysisDataRequestDto } from '@/types/Dto/InvestigationData';
import { PatientInvestigationAnalysisDto } from '@/types/Dto/PatientInvestigationAnalysisDto';
import { debounce } from 'lodash';
import { useState, useEffect, useCallback } from 'react';

const useGetInvestigationDataAnalysis = () => {
    const [data, setData] = useState<PatientInvestigationAnalysisDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [searchPatientAnalysisQuery, setSearchPatientAnalysisQuery] = useState<PatientAnalysisDataRequestDto | null>(null);

    const searchPatients = useCallback(
        debounce(async (query: PatientAnalysisDataRequestDto, signal: AbortSignal) => {
            setLoading(true);
            try {
                const patientsData = await fetchPatientInvestigationData(query, signal);                
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

        if (searchPatientAnalysisQuery) {
            searchPatients(searchPatientAnalysisQuery, signal);
        }

        return () => controller.abort();
    }, [searchPatientAnalysisQuery, searchPatients]);

    return { data, setData, loading, error, searchPatientAnalysisQuery, setSearchPatientAnalysisQuery };
};

export default useGetInvestigationDataAnalysis;