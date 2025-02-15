import { addDoctor } from '@/services/api';
import { DoctorType } from '@/types/entity/doctor';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from '../auth/useCurrentUser';

const useAddDoctor = () => {
    const queryClient = useQueryClient();
    const currentUser = useCurrentUser();

    const mutation = useMutation({
        mutationFn: (doctorData: DoctorType) => addDoctor(doctorData, currentUser?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["doctors"], exact: false });
        },
        onError: (error) => {
            console.error("Error adding doctor:", error);
        },
    });

    return mutation;
};

export default useAddDoctor;
