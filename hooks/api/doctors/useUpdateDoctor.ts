import { updateDoctor } from '@/services/api';
import { DoctorType } from '@/types/entity/doctor';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from '../auth/useCurrentUser';

const useUpdateDoctor = () => {
    const queryClient = useQueryClient();
    const currentUser = useCurrentUser();

    const mutation = useMutation({
        mutationFn: ({ doctorId, doctorData, signal }: { doctorId: number; doctorData: DoctorType; signal?: AbortSignal }) => 
            updateDoctor(doctorId, doctorData, signal, currentUser?.id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["doctors"], exact: false });
        },

        onError: (error) => {
            console.error("Error updating doctor:", error);
        }
    });

    return mutation;
};

export default useUpdateDoctor;
