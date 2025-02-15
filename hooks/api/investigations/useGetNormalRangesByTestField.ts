import { useQuery } from "@tanstack/react-query";
import { fetchNormalRangesByInvestigationFieldId } from "@/services/investigationAPI";
import { NormalRange } from "@/types/entity/investigation";
import { useCurrentUser } from "../auth/useCurrentUser";

const useGetNormalRangesByTestField = (testFieldId?: number) => {
    const controller = new AbortController();
    const { signal } = controller;
    const currentUser = useCurrentUser();

    return useQuery<{ content?: NormalRange }>({
        queryKey: ["normal-ranges", testFieldId], // Unique cache key
        queryFn: () => {
            if (testFieldId) {
                return fetchNormalRangesByInvestigationFieldId(testFieldId, signal, currentUser?.id)
            }
            return { content: undefined };
        },
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default useGetNormalRangesByTestField;
