import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvestigationDataAddedStatus } from '@/services/investigationDataAPI';

const useUpdateInvestigationAsDataNotAdded = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ investigationRegisterId, investigationId }: { investigationRegisterId: number, investigationId: number }) =>
            updateInvestigationDataAddedStatus(investigationRegisterId, investigationId),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["registrations"], exact: false });
        },

        onError: (error) => {
            console.error("Error updating investigation data added status:", error);
        }
    });

    return mutation;
};

export default useUpdateInvestigationAsDataNotAdded;
