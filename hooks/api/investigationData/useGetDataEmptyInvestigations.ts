import { useQuery } from "@tanstack/react-query";
import { fetchDataEmptyInvestigations } from "@/services/investigationDataAPI";
import { DataEmptyTests } from "@/types/entity/investigation";
import { useCurrentUser } from "../auth/useCurrentUser";

const useGetDataEmptyInvestigations = () => {
    const controller = new AbortController();
    const { signal } = controller;
    const currentUser = useCurrentUser();

    return useQuery<{ content: DataEmptyTests[] }>({
        queryKey: ["data-empty-investigations"], // Unique cache key
        queryFn: () => fetchDataEmptyInvestigations(currentUser?.id, signal),
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default useGetDataEmptyInvestigations;
