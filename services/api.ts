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

export const updatePatient = async (patientId: number, patientData: PatientType, signal?: AbortSignal): Promise<PatientType> => {
    
    const response = await fetch(`${API_BASE_URL}/patient/update?id=${patientId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
    });

    if (!response.ok) {
        throw new Error('Failed to update patient');
    }

    return response.json();
};

export const deletePatient = async (patientIds: number[], signal?: AbortSignal): Promise<boolean> => {
    
    const response = await fetch(`${API_BASE_URL}/patient/delete?ids=${patientIds}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete patients');
    }

    return response.json();
};