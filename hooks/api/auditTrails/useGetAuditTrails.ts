import { useQuery } from "@tanstack/react-query";
import { PatientType } from "@/types/entity/patient";
import { Page } from "@/types/Dto/CommonNetworkTypes";
import { fetchAuditTrails } from "@/services/auditTrailAPI";

const useGetAuditTrails = ({ limit, skip, startDate, endDate }: { limit: number, skip: number, startDate?: string, endDate?: string }) => {
    const controller = new AbortController();
    const { signal } = controller;

    return useQuery<Page<PatientType>>({
        queryKey: ["audit-trails", limit, skip, startDate, endDate], // Unique cache key
        queryFn: () => fetchAuditTrails({ limit, skip, startDate, endDate }, signal),
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default useGetAuditTrails;
