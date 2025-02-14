import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BranchType } from "@/types/entity/branch";
import { addBranch } from "@/services/branchAPI";

const useAddBranch = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (branchData: BranchType) => addBranch(branchData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["branches"], exact: false });
        },
        onError: (error) => {
            console.error("Error adding branch:", error);
        },
    });

    return mutation;
};

export default useAddBranch;
