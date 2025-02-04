import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePatient } from "@/services/api";
import { PatientType } from "@/types/entity/patient";

const useUpdatePatient = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ patientId, patientData, signal }: { patientId: number; patientData: PatientType; signal?: AbortSignal }) => 
            updatePatient(patientId, patientData, signal),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["patients"], exact: false });
        },

        onError: (error) => {
            console.error("Error updating patient:", error);
        }
    });

    return mutation;
};

export default useUpdatePatient;
