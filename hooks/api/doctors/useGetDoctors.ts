import { useQuery } from "@tanstack/react-query";
import { fetchDoctors } from "@/services/api";
import { Page } from "@/types/Dto/CommonNetworkTypes";
import { DoctorType } from "@/types/entity/doctor";
import { DoctorRequestDtoType } from "@/types/Dto/DoctorDto";

const useGetDoctors = ({ limit, skip, search }: DoctorRequestDtoType) => {
    const controller = new AbortController();
    const { signal } = controller;

    return useQuery<Page<DoctorType>>({
        queryKey: ["doctors", limit, skip, search], // Unique cache key
        queryFn: () => fetchDoctors({ limit, skip, search }, signal),
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default useGetDoctors;
