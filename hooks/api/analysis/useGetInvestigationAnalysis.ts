import { useQuery } from "@tanstack/react-query";
import { fetchInvestigationAnalysisData } from '@/services/analysisAPI';
import { AnalysisData } from '@/types/entity/investigation';
import { useCurrentUser } from "../auth/useCurrentUser";

const useGetInvestigationAnalysis = ({ initial, startDate, endDate, branchId }: { initial: boolean, startDate?: string, endDate?: string, branchId?: number }) => {
    const controller = new AbortController();
    const { signal } = controller;
    const currentUser = useCurrentUser();

    return useQuery<{ content?: AnalysisData }>({
        queryKey: ["investigation-analysis", startDate, endDate, branchId], // Unique cache key
        queryFn: () => {
            if (initial) {
                return {};
            }
            return fetchInvestigationAnalysisData({ startDate, endDate }, signal, currentUser?.id, branchId)
        },
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default useGetInvestigationAnalysis;

