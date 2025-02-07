import { useQuery } from "@tanstack/react-query";
import { fetchNormalRangesByInvestigationFieldId } from "@/services/investigationAPI";
import { NormalRange } from "@/types/entity/investigation";

const useGetNormalRangesByTestField = (testFieldId?: number) => {
    const controller = new AbortController();
    const { signal } = controller;

    return useQuery<{ content?: NormalRange }>({
        queryKey: ["normal-ranges", testFieldId], // Unique cache key
        queryFn: () => {
            if (testFieldId) {
                return fetchNormalRangesByInvestigationFieldId(testFieldId, signal)
            }
            return { content: undefined };
        },
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default useGetNormalRangesByTestField;
