import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvestigationData } from '@/services/investigationDataAPI';

const useUpdateInvestigationData = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({
            investigationRegisterId, investigationId, body }: { investigationRegisterId: number, investigationId: number, body: { data: object; options: object; doctor_id?: number; version: number; } }) =>
            updateInvestigationData(investigationRegisterId, investigationId, body),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["investigation-data"], exact: false });
        },

        onError: (error) => {
            console.error("Error updating investigation data:", error);
        }
    });

    return mutation;
};

export default useUpdateInvestigationData;
