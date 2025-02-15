import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPatient } from "@/services/api";
import { PatientType } from "@/types/entity/patient";
import { useCurrentUser } from "./auth/useCurrentUser";

const useAddPatient = () => {
    const queryClient = useQueryClient();
    const currentUser = useCurrentUser();

    const mutation = useMutation({
        mutationFn: (patientData: PatientType) => addPatient(patientData, currentUser?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["patients"], exact: false });
        },
        onError: (error) => {
            console.error("Error adding patient:", error);
        },
    });

    return mutation;
};

export default useAddPatient;
