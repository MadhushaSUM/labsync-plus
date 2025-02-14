import { useQuery } from "@tanstack/react-query";
import { PatientRequestDtoType } from "@/types/Dto/patientDto";
import { Page } from "@/types/Dto/CommonNetworkTypes";
import { BranchType } from "@/types/entity/branch";
import { fetchBranches } from "@/services/branchAPI";

const useGetBranches = ({ limit, skip, search }: PatientRequestDtoType) => {
    const controller = new AbortController();
    const { signal } = controller;

    return useQuery<Page<BranchType>>({
        queryKey: ["branches", limit, skip, search], // Unique cache key
        queryFn: () => fetchBranches({ limit, skip, search }, signal),
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default useGetBranches;
