import { useQuery } from "@tanstack/react-query";
import { PatientRequestDtoType } from "@/types/Dto/patientDto";
import { Page } from "@/types/Dto/CommonNetworkTypes";
import { fetchUsers } from "@/services/authAPI";
import { UserType } from "@/types/entity/user";
import { useCurrentUser } from "./useCurrentUser";

const useGetUsers = ({ limit, skip, search }: PatientRequestDtoType) => {
    const controller = new AbortController();
    const { signal } = controller;
    const currentUser = useCurrentUser();

    return useQuery<Page<UserType>>({
        queryKey: ["users", limit, skip, search], // Unique cache key
        queryFn: () => fetchUsers({ limit, skip, search }, signal, currentUser?.id),
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default useGetUsers;
