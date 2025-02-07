import { useQuery } from "@tanstack/react-query";
import { fetchNormalRangesByInvestigationId } from "@/services/investigationAPI";
import { NormalRange } from "@/types/entity/investigation";

const useGetNormalRangesByTest = (testId: number) => {
    const controller = new AbortController();
    const { signal } = controller;

    return useQuery<{content: NormalRange[]}>({
        queryKey: ["normal-ranges", testId], // Unique cache key
        queryFn: () => fetchNormalRangesByInvestigationId(testId, signal),
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default useGetNormalRangesByTest;
