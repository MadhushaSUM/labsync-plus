import { deletePatient } from '@/services/api';

const useDeletePatient = () => {
    const deleteSelectedPatients = async (patientIds: number[], signal?: AbortSignal) => {
        try {
            await deletePatient(patientIds, signal);
            return Promise.resolve();
        } catch (error: any) {
            return Promise.reject(new Error(error.message || "Failed to delete patients"));
        }
    };

    return { deleteSelectedPatients };
};

export default useDeletePatient;
