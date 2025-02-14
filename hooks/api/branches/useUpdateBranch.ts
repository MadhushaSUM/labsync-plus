import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBranch } from "@/services/branchAPI";
import { BranchType } from "@/types/entity/branch";

const useUpdateBranch = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ branchId, branchData, signal }: { branchId: number, branchData: BranchType; signal?: AbortSignal }) =>
            updateBranch(branchId, branchData, signal),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["branches"], exact: false });
        },

        onError: (error) => {
            console.error("Error updating branch:", error);
        }
    });

    return mutation;
};

export default useUpdateBranch;
