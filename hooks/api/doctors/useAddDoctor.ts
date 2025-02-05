import { addDoctor } from '@/services/api';
import { DoctorType } from '@/types/entity/doctor';
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddDoctor = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (doctorData: DoctorType) => addDoctor(doctorData),
        onSuccess: (newDoctor) => {
            queryClient.invalidateQueries({ queryKey: ["doctors"], exact: false });
        },
        onError: (error) => {
            console.error("Error adding doctor:", error);
        },
    });

    return mutation;
};

export default useAddDoctor;
