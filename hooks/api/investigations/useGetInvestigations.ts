import { useQuery } from "@tanstack/react-query";
import { PatientRequestDtoType } from "@/types/Dto/patientDto";
import { Page } from "@/types/Dto/CommonNetworkTypes";
import { fetchInvestigations } from "@/services/investigationAPI";
import { Test } from "@/types/entity/investigation";

const useGetInvestigations = ({ limit, skip, search }: PatientRequestDtoType) => {
    const controller = new AbortController();
    const { signal } = controller;

    return useQuery<Page<Test>>({
        queryKey: ["investigations", limit, skip, search], // Unique cache key
        queryFn: () => fetchInvestigations({ limit, skip, search }, signal),
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default useGetInvestigations;
