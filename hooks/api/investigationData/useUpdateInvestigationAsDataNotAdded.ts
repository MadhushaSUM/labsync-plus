import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvestigationDataAddedStatus } from '@/services/investigationDataAPI';
import { useCurrentUser } from "../auth/useCurrentUser";

const useUpdateInvestigationAsDataNotAdded = () => {
    const queryClient = useQueryClient();
    const currentUser = useCurrentUser();

    const mutation = useMutation({
        mutationFn: ({ investigationRegisterId, investigationId }: { investigationRegisterId: number, investigationId: number }) =>
            updateInvestigationDataAddedStatus(investigationRegisterId, investigationId, currentUser?.id),

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
