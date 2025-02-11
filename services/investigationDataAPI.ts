import { PatientAnalysisDataRequestDto } from "@/types/Dto/InvestigationData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchInvestigationData = async (investigationRegisterId: number, investigationId: number, signal: AbortSignal) => {
    const response = await fetch(`${API_BASE_URL}/investigationData/get?investigationRegisterId=${investigationRegisterId}&investigationId=${investigationId}`, { signal });
    if (!response.ok) {
        throw new Error('Failed to fetch investigation data');
    }

    return response.json();
};

export const fetchPatientInvestigationData = async (
    query: PatientAnalysisDataRequestDto,
    signal: AbortSignal
) => {
    const response = await fetch(`${API_BASE_URL}/investigationData/patient-analysis?patientId=${query.patientId}&investigationId=${query.investigationId}&startDate=${query.startDate}&endDate=${query.endDate}`, { signal });
    if (!response.ok) {
        throw new Error('Failed to fetch investigation data for patient analysis');
    }

    return response.json();
};

export const fetchDataEmptyInvestigations = async (signal: AbortSignal) => {
    const response = await fetch(`${API_BASE_URL}/investigation-data/data-empty`, { signal });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch data empty investigations");
    }

    return response.json();
}

export const fetchDataAddedInvestigations = async ({ limit, skip, patientId, startDate, endDate, refNumber, allReports }: {
    limit: number;
    skip: number;
    patientId?: number;
    startDate?: string;
    endDate?: string;
    refNumber?: number;
    allReports?: boolean;
},
    signal: AbortSignal
) => {
    let params = `limit=${limit}&offset=${skip}`;

    if (patientId) {
        params += `&patientId=${patientId}`;
    }
    if (startDate) {
        params += `&startDate=${startDate}`;
    }
    if (endDate) {
        params += `&endDate=${endDate}`;
    }
    if (refNumber) {
        params += `&refNumber=${refNumber}`;
    }
    if (allReports) {
        params += `&allReports=${allReports}`;
    }

    const response = await fetch(`${API_BASE_URL}/investigation-data/data-added?${params}`, { signal });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch data added registrations");
    }

    return response.json();
};

export const updateInvestigationData = async (
    investigationRegisterId: number,
    investigationId: number,
    body: { data: object; options: object; doctor_id?: number; version: number; }
) => {
    try {
        const response = await fetch(`${API_BASE_URL}/investigation-data?investigationRegisterId=${investigationRegisterId}&investigationId=${investigationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update investigation data");
        }

        return response;
    } catch (error) {
        throw error;
    }
};

export const updateInvestigationPrintedStatus = async (
    investigationRegisterId: number,
    investigationId: number,
) => {
    try {
        const response = await fetch(`${API_BASE_URL}/investigation-data/printed?investigationRegisterId=${investigationRegisterId}&investigationId=${investigationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update investigation as printed");
        }

        return response;
    } catch (error) {
        throw error;
    }
};