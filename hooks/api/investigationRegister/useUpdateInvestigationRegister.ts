import { updateInvestigationRegistrations } from '@/services/investigationRegistrationAPI';
import { UpdateRegistrationRequestDtoType } from '@/types/Dto/InvestigationRegistryDto';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from '../auth/useCurrentUser';

const useUpdateRegistration = () => {
    const queryClient = useQueryClient();
    const currentUser = useCurrentUser();

    const mutation = useMutation({
        mutationFn: ({ registrationId, registrationData, signal }: { registrationId: number; registrationData: UpdateRegistrationRequestDtoType; signal?: AbortSignal }) =>
            updateInvestigationRegistrations(registrationId, registrationData, signal, currentUser?.id),

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
