import { PatientRequestDtoType } from "@/types/Dto/patientDto";

const API_BASE_URL = 'http://localhost:8080';

export const fetchPatients = async ({ limit, skip }: PatientRequestDtoType, signal: AbortSignal) => {
    const response = await fetch(`${API_BASE_URL}/patient/getAll?limit=${limit}&skip=${skip}`, { signal });
    if (!response.ok) {
        throw new Error('Failed to fetch patients');
    }
    
    return response.json();
};