
import { useState, useEffect } from 'react';
import { fetchPatients } from '@/services/api';
import { PatientRequestDtoType } from '@/types/Dto/patientDto';
import { PatientType } from '@/types/entity/patient';
import { Page } from '@/types/Dto/CommonNetworkTypes';

const useGetPatients = ({ limit, skip }: PatientRequestDtoType) => {
    const [data, setData] = useState<Page<PatientType>>({ content: [], totalPages: 0, totalElements: 0 });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const loadPatients = async () => {
            setLoading(true);
            try {
                const patients = await fetchPatients({ limit, skip }, signal);
                setData(patients);
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    setError(error);
                }
            } finally {
                setLoading(false);
            }
        };

        loadPatients();

        return () => controller.abort();
    }, [limit, skip]);

    return { data, loading, error };
};

export default useGetPatients;
