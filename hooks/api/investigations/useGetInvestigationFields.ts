import { useQuery } from "@tanstack/react-query";
import { fetchInvestigationFields } from "@/services/investigationAPI";
import { TestField } from "@/types/entity/investigation";
import { useCurrentUser } from "../auth/useCurrentUser";

const useGetInvestigationFields = (testId?: number) => {
    const controller = new AbortController();
    const { signal } = controller;
    const currentUser = useCurrentUser();

    return useQuery<{ content: TestField[] }>({
        queryKey: ["investigation-fields", testId], // Unique cache key
        queryFn: () => {
            if (testId) {
                return fetchInvestigationFields(testId, signal, currentUser?.id);
            }
            return { content: [] };
        },
        staleTime: 1000 * 60 * 60, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default useGetInvestigationFields;

//TODO: this hook must be updated not to use back-end. This data is not subjected to change therefore can hardcode to front-end to cost optimize
