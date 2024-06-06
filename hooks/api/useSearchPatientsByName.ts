
import { useState, useEffect, useCallback } from 'react';
import { searchPatientsByName } from '@/services/api';
import { PatientType } from '@/types/entity/patient';
import debounce from "lodash/debounce";

const useSearchPatientsByName = (initialQuery: string = '') => {
    const [searchPatientData, setSearchPatientData] = useState<PatientType[]>([]);
    const [loadingSearchPatients, setLoadingSearchPatients] = useState<boolean>(true);
    const [errorSearchPatients, setErrorSearchPatients] = useState<Error | null>(null);
    const [searchPatientQuery, setSearchPatientQuery] = useState<string>(initialQuery);

    const searchPatients = useCallback(
        debounce(async (query: string, signal: AbortSignal) => {
            setLoadingSearchPatients(true);
            try {
                const patients = await searchPatientsByName(query, signal);
                setSearchPatientData(patients);
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    setErrorSearchPatients(error);
                }
            } finally {
                setLoadingSearchPatients(false);
            }
        }, 500),
        []
    );

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        if (searchPatientQuery) {
            searchPatients(searchPatientQuery, signal);
        }
        
        return () => controller.abort();
    }, [searchPatientQuery, searchPatients]);

    return { searchPatientData, loadingSearchPatients, errorSearchPatients, searchPatientQuery, setSearchPatientQuery };
};

export default useSearchPatientsByName;
