import { addInvestigationRegistrations } from '@/services/investigationRegistrationAPI';
import { NewInvestigationRegistryRequestDtoType } from '@/types/Dto/InvestigationRegistryDto';
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddInvestigationRegister = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (investigationRegister: NewInvestigationRegistryRequestDtoType) => addInvestigationRegistrations(investigationRegister),
        onSuccess: (investigationRegister) => {
            queryClient.invalidateQueries({ queryKey: ["registrations"], exact: false });
        },
        onError: (error) => {
            console.error("Error adding registration:", error);
        },
    });

    return mutation;
};

export default useAddInvestigationRegister;
