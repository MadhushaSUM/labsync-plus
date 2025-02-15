import { useQuery } from "@tanstack/react-query";
import { fetchFinancialAnalysisData } from '@/services/analysisAPI';
import { FinancialAnalysisOutput } from '@/types/entity/investigation';
import { useCurrentUser } from "../auth/useCurrentUser";

const useGetFinancialAnalysis = ({ step, startDate, endDate }: { step?: string, startDate?: string, endDate?: string }) => {
    const controller = new AbortController();
    const { signal } = controller;
    const currentUser = useCurrentUser();

    return useQuery<{ content?: FinancialAnalysisOutput }>({
        queryKey: ["financial-analysis", step, startDate, endDate], // Unique cache key
        queryFn: () => {
            if (!step) {
                return { content: undefined };
            }
            return fetchFinancialAnalysisData({ step, startDate, endDate }, signal, currentUser?.id)
        },
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default useGetFinancialAnalysis;

