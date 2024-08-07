import { DoctorRequestDtoType } from "@/types/Dto/DoctorDto";
import { PatientRequestDtoType } from "@/types/Dto/patientDto";
import { DoctorType } from "@/types/entity/doctor";
import { PatientType } from "@/types/entity/patient";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchPatients = async ({ limit, skip }: PatientRequestDtoType, signal: AbortSignal) => {   
     
    const response = await fetch(`${API_BASE_URL}/patient/getAll?limit=${limit}&skip=${skip}`, { signal });
    if (!response.ok) {
        throw new Error('Failed to fetch patients');
    }

    return response.json();
};

export const searchPatientsByName = async (query: string, signal: AbortSignal) => {   
     
    const response = await fetch(`${API_BASE_URL}/patient/searchByName?query=${query}`, { signal });
    if (!response.ok) {
        throw new Error('Failed to search patients');
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


export const fetchDoctors = async ({ limit, skip }: DoctorRequestDtoType, signal: AbortSignal) => {    
    const response = await fetch(`${API_BASE_URL}/doctor/getAll?limit=${limit}&skip=${skip}`, { signal });
    if (!response.ok) {
        throw new Error('Failed to fetch doctors');
    }

    return response.json();
};

export const searchDoctorsByName = async (query: string, signal: AbortSignal) => {   
     
    const response = await fetch(`${API_BASE_URL}/doctor/searchByName?query=${query}`, { signal });
    if (!response.ok) {
        throw new Error('Failed to search patients');
    }

    return response.json();
};

export const addDoctor = async (doctor: DoctorType) => {
    const response = await fetch(`${API_BASE_URL}/doctor/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctor)
    });
    if (!response.ok) {
        throw new Error('Failed to add doctor');
    }

    return response.json();
};

export const updateDoctor = async (doctorId: number, doctorData: DoctorType, signal?: AbortSignal): Promise<DoctorType> => {
    
    const response = await fetch(`${API_BASE_URL}/doctor/update?id=${doctorId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
    });

    if (!response.ok) {
        throw new Error('Failed to update doctor');
    }

    return response.json();
};