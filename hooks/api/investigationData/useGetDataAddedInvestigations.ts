import { useQuery } from "@tanstack/react-query";
import { DataEmptyTests } from "@/types/entity/investigation";
import { fetchDataAddedInvestigations } from "@/services/investigationDataAPI";
import { Page } from '@/types/Dto/CommonNetworkTypes';
import { useCurrentUser } from "../auth/useCurrentUser";

const useGetDataAddedInvestigations = ({ limit, skip, patientId, startDate, endDate, refNumber, branchId, allReports }: {
    limit: number;
    skip: number;
    patientId?: number;
    startDate?: string;
    endDate?: string;
    refNumber?: number;
    branchId?: number;
    allReports?: boolean;
}) => {
    const controller = new AbortController();
    const { signal } = controller;
    const currentUser = useCurrentUser();

    return useQuery<Page<DataEmptyTests>>({
        queryKey: ["data-added-investigations", limit, skip, patientId, startDate, endDate, refNumber, allReports, branchId], // Unique cache key
        queryFn: () => fetchDataAddedInvestigations({ limit, skip, patientId, startDate, endDate, refNumber, branchId, allReports }, signal, currentUser?.id),
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default useGetDataAddedInvestigations;
