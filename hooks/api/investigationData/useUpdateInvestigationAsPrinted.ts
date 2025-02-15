import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvestigationPrintedStatus } from '@/services/investigationDataAPI';
import { useCurrentUser } from "../auth/useCurrentUser";

const useUpdateInvestigationAsPrinted = () => {
    const queryClient = useQueryClient();
    const currentUser = useCurrentUser();

    const mutation = useMutation({
        mutationFn: ({ investigationRegisterId, investigationId }: { investigationRegisterId: number, investigationId: number }) =>
            updateInvestigationPrintedStatus(investigationRegisterId, investigationId, currentUser?.id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["investigation-data"], exact: false });
        },

        onError: (error) => {
            console.error("Error updating investigation status:", error);
        }
    });

    return mutation;
};

export default useUpdateInvestigationAsPrinted;
