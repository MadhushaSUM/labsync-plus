import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvestigationPrice } from "@/services/investigationAPI";
import { Test } from "@/types/entity/investigation";
import { useCurrentUser } from "../auth/useCurrentUser";

const useUpdateInvestigationPrice = () => {
    const queryClient = useQueryClient();
    const currentUser = useCurrentUser();

    const mutation = useMutation({
        mutationFn: ({ investigationId, investigation, signal }: { investigationId: number; investigation: Test; signal?: AbortSignal }) =>
            updateInvestigationPrice(investigationId, investigation, signal, currentUser?.id),

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
