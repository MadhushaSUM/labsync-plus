import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvestigationPrintedStatus } from '@/services/investigationDataAPI';

const useUpdateInvestigationAsPrinted = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ investigationRegisterId, investigationId }: { investigationRegisterId: number, investigationId: number }) =>
            updateInvestigationPrintedStatus(investigationRegisterId, investigationId),

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
