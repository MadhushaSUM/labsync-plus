import { addInvestigationRegistrations } from '@/services/investigationRegistrationAPI';
import { NewInvestigationRegistryRequestDtoType } from '@/types/Dto/InvestigationRegistryDto';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from '../auth/useCurrentUser';

const useAddInvestigationRegister = () => {
    const queryClient = useQueryClient();
    const currentUser = useCurrentUser();

    const mutation = useMutation({
        mutationFn: (investigationRegister: NewInvestigationRegistryRequestDtoType) => addInvestigationRegistrations(investigationRegister, currentUser?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["registrations"], exact: false });
        },
        onError: (error) => {
            console.error("Error adding registration:", error);
        },
    });

    return mutation;
};

export default useAddInvestigationRegister;
