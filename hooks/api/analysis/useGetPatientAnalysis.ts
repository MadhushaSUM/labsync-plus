import { useQuery } from "@tanstack/react-query";
import { fetchPatientAnalysisData } from '@/services/analysisAPI';
import { AnalysisData } from '@/types/entity/investigation';
import { useCurrentUser } from "../auth/useCurrentUser";

const useGetPatientAnalysis = ({ patientId, startDate, endDate }: { patientId?: number, startDate?: string, endDate?: string }) => {
    const controller = new AbortController();
    const { signal } = controller;
    const currentUser = useCurrentUser();

    return useQuery<{ content?: AnalysisData }>({
        queryKey: ["patient-analysis", patientId, startDate, endDate], // Unique cache key
        queryFn: () => {
            if (!patientId) {
                return { content: undefined };
            }
            return fetchPatientAnalysisData({ patientId, startDate, endDate }, signal, currentUser?.id)
        },
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default useGetPatientAnalysis;

