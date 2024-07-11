
import { useState, useEffect, useCallback } from 'react';
import { searchDoctorsByName } from '@/services/api';
import debounce from "lodash/debounce";
import { DoctorType } from '@/types/entity/doctor';

const useSearchDoctorsByName = (initialQuery: string = '') => {
    const [searchDoctorData, setSearchDoctorData] = useState<DoctorType[]>([]);
    const [loadingSearchDoctors, setLoadingSearchDoctors] = useState<boolean>(true);
    const [errorSearchDoctors, setErrorSearchDoctors] = useState<Error | null>(null);
    const [searchDoctorQuery, setSearchDoctorQuery] = useState<string>(initialQuery);

    const searchDoctors = useCallback(
        debounce(async (query: string, signal: AbortSignal) => {
            setLoadingSearchDoctors(true);
            try {
                const doctors = await searchDoctorsByName(query, signal);
                setSearchDoctorData(doctors);
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    setErrorSearchDoctors(error);
                }
            } finally {
                setLoadingSearchDoctors(false);
            }
        }, 500),
        []
    );

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        if (searchDoctorQuery) {
            searchDoctors(searchDoctorQuery, signal);
        }
        
        return () => controller.abort();
    }, [searchDoctorQuery, searchDoctors]);

    return { searchDoctorData, loadingSearchDoctors, errorSearchDoctors, searchDoctorQuery, setSearchDoctorQuery };
};

export default useSearchDoctorsByName;
