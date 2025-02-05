import { updateDoctor } from '@/services/api';
import { DoctorType } from '@/types/entity/doctor';
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateDoctor = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ doctorId, doctorData, signal }: { doctorId: number; doctorData: DoctorType; signal?: AbortSignal }) => 
            updateDoctor(doctorId, doctorData, signal),

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
