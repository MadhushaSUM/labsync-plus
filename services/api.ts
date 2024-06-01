import { PatientRequestDtoType } from "@/types/Dto/patientDto";
import { PatientType } from "@/types/entity/patient";

const API_BASE_URL = 'http://localhost:8080';

export const fetchPatients = async ({ limit, skip }: PatientRequestDtoType, signal: AbortSignal) => {
    const response = await fetch(`${API_BASE_URL}/patient/getAll?limit=${limit}&skip=${skip}`, { signal });
    if (!response.ok) {
        throw new Error('Failed to fetch patients');
    }

    return response.json();
};

export const addPatient = async (patient: PatientType) => {
    const response = await fetch(`${API_BASE_URL}/patient/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient)
    });
    if (!response.ok) {
        throw new Error('Failed to add patient');
    }

    return response.json();
};