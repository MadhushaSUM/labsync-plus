import { Page } from '@/types/Dto/CommonNetworkTypes';
import { Registration } from '@/types/entity/investigationRegister';
import { fetchInvestigationRegistrations } from '@/services/investigationRegistrationAPI';
import { useQuery } from "@tanstack/react-query";
import { InvestigationRegistryRequestDtoType } from '@/types/Dto/InvestigationRegistryDto';
import { useCurrentUser } from '../auth/useCurrentUser';

const useGetInvestigationRegisters = ({ limit, skip, patientId, startDate, endDate, refNumber }: InvestigationRegistryRequestDtoType) => {
    const controller = new AbortController();
    const { signal } = controller;
    const currentUser = useCurrentUser();

    return useQuery<Page<Registration>>({
        queryKey: ["registrations", limit, skip, patientId, startDate, endDate, refNumber], // Unique cache key
        queryFn: () => fetchInvestigationRegistrations({ limit, skip, patientId, startDate, endDate, refNumber }, signal, currentUser?.id),
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default useGetInvestigationRegisters;

