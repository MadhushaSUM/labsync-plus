import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvestigationPrice } from "@/services/investigationAPI";
import { Test } from "@/types/entity/investigation";

const useUpdateInvestigationPrice = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ investigationId, investigation, signal }: { investigationId: number; investigation: Test; signal?: AbortSignal }) => 
            updateInvestigationPrice(investigationId, investigation, signal),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["investigations"], exact: false });
        },

        onError: (error) => {
            console.error("Error updating patient:", error);
        }
    });

    return mutation;
};

export default useUpdateInvestigationPrice;
