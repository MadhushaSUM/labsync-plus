import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPatient } from "@/services/api";
import { PatientType } from "@/types/entity/patient";

const useAddPatient = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (patientData: PatientType) => addPatient(patientData),
        onSuccess: (newPatient) => {
            queryClient.invalidateQueries({ queryKey: ["patients"], exact: false });
        },
        onError: (error) => {
            console.error("Error adding patient:", error);
        },
    });

    return mutation;
};

export default useAddPatient;
