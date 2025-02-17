import { useQuery } from "@tanstack/react-query";
import { fetchPatients } from "@/services/api";
import { PatientRequestDtoType } from "@/types/Dto/patientDto";
import { PatientType } from "@/types/entity/patient";
import { Page } from "@/types/Dto/CommonNetworkTypes";
import { useCurrentUser } from "./auth/useCurrentUser";

const useGetPatients = ({ limit, skip, search }: PatientRequestDtoType) => {
    const controller = new AbortController();
    const { signal } = controller;
    const currentUser = useCurrentUser();

    return useQuery<Page<PatientType>>({
        queryKey: ["patients", limit, skip, search], // Unique cache key
        queryFn: () => fetchPatients({ limit, skip, search }, signal, currentUser?.id),
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default useGetPatients;
