import { useQuery } from "@tanstack/react-query";
import { DataEmptyTests } from "@/types/entity/investigation";
import { fetchDataAddedInvestigations } from "@/services/investigationDataAPI";
import { InvestigationRegistryRequestDtoType } from "@/types/Dto/InvestigationRegistryDto";
import { Page } from '@/types/Dto/CommonNetworkTypes';

const useGetDataAddedInvestigations = ({ limit, skip, patientId, startDate, endDate, refNumber, allReports }: {
    limit: number;
    skip: number;
    patientId?: number;
    startDate?: string;
    endDate?: string;
    refNumber?: number;
    allReports?: boolean;
}) => {
    const controller = new AbortController();
    const { signal } = controller;

    return useQuery<Page<DataEmptyTests>>({
        queryKey: ["data-added-investigations", limit, skip, patientId, startDate, endDate, refNumber, allReports], // Unique cache key
        queryFn: () => fetchDataAddedInvestigations({ limit, skip, patientId, startDate, endDate, refNumber, allReports }, signal),
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default useGetDataAddedInvestigations;
