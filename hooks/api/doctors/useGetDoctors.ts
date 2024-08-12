
import { useState, useEffect } from 'react';
import { Page } from '@/types/Dto/CommonNetworkTypes';
import { DoctorRequestDtoType } from '@/types/Dto/DoctorDto';
import { fetchDoctors } from '@/services/api';
import { DoctorType } from '@/types/entity/doctor';

const useGetDoctors = ({ limit, offset }: DoctorRequestDtoType) => {
    const [data, setData] = useState<Page<DoctorType>>({ content: [], totalPages: 0, totalElements: 0 });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);    

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const loadPatients = async () => {
            setLoading(true);
            try {
                const patients = await fetchDoctors({ limit, offset }, signal);
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
    }, [limit, offset]);

    return { data, loading, error };
};

export default useGetDoctors;
