import { fetchPatientPortalData } from "@/services/patientPortalAPI";
import { DataEmptyTests, NormalRange } from "@/types/entity/investigation";
import { useQuery } from "@tanstack/react-query";

const usePatientPortal = (queryString?: string) => {
    const controller = new AbortController();
    const { signal } = controller;

    return useQuery<{ content?: DataEmptyTests, normalRanges?: NormalRange[] }>({
        queryKey: ["patient-portal-data", queryString], // Unique cache key
        queryFn: () => {
            if (!queryString) {
                return { content: undefined };
            }
            return fetchPatientPortalData(queryString, signal)
        },
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default usePatientPortal;
