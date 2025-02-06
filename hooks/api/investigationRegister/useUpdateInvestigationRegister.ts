import { updateInvestigationRegistrations } from '@/services/investigationRegistrationAPI';
import { UpdateRegistrationRequestDtoType } from '@/types/Dto/InvestigationRegistryDto';
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateRegistration = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ registrationId, registrationData, signal }: { registrationId: number; registrationData: UpdateRegistrationRequestDtoType; signal?: AbortSignal }) =>
            updateInvestigationRegistrations(registrationId, registrationData, signal),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["registrations"], exact: false });
        },

        onError: (error) => {
            console.error("Error updating registration:", error);
        }
    });

    return mutation;
};

export default useUpdateRegistration;
