import { PatientAnalysisDataRequestDto } from "@/types/Dto/InvestigationData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchInvestigationData = async (investigationRegisterId: number, investigationId: number, signal: AbortSignal, userId?: string) => {
    const response = await fetch(`${API_BASE_URL}/investigationData/get?userId=${userId}&investigationRegisterId=${investigationRegisterId}&investigationId=${investigationId}`, { signal });
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

export const fetchDataEmptyInvestigations = async (userId?: string, branchId?: number, signal?: AbortSignal) => {
    let params = `userId=${userId}`;

    if (branchId) {
        params += `&branchId=${branchId}`;
    }

    const response = await fetch(`${API_BASE_URL}/investigation-data/data-empty?${params}`, { signal });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch data empty investigations");
    }

    return response.json();
}

export const fetchDataAddedInvestigations = async ({ limit, skip, patientId, startDate, endDate, refNumber, branchId, allReports }: {
    limit: number;
    skip: number;
    patientId?: number;
    startDate?: string;
    endDate?: string;
    refNumber?: number;
    branchId?: number;
    allReports?: boolean;
},
    signal: AbortSignal,
    userId?: string,
) => {
    let params = `userId=${userId}&limit=${limit}&offset=${skip}`;

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
    if (branchId) {
        params += `&branchId=${branchId}`;
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

export const updateInvestigationDataAddedStatus = async (
    investigationRegisterId: number,
    investigationId: number,
    userId?: string,
) => {
    try {
        const response = await fetch(`${API_BASE_URL}/investigation-data/data-added?userId=${userId}&investigationRegisterId=${investigationRegisterId}&investigationId=${investigationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update investigation as data not added!");
        }

        return response;
    } catch (error) {
        throw error;
    }
};

export const updateInvestigationData = async (
    investigationRegisterId: number,
    investigationId: number,
    body: { data: object; options: object; doctor_id?: number; version: number; },
    userId?: string,
) => {
    try {
        const response = await fetch(`${API_BASE_URL}/investigation-data?userId=${userId}&investigationRegisterId=${investigationRegisterId}&investigationId=${investigationId}`, {
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
    userId?: string
) => {
    try {
        const response = await fetch(`${API_BASE_URL}/investigation-data/printed?userId=${userId}&investigationRegisterId=${investigationRegisterId}&investigationId=${investigationId}`, {
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

export const triggerWhatsAppMessage = async (investigationRegisterId: number, investigationId: number, patientId: number, signal?: AbortSignal, userId?: string) => {
    const response = await fetch(`${API_BASE_URL}/investigation-data/whatsapp?userId=${userId}&registrationId=${investigationRegisterId}&investigationId=${investigationId}&patientId=${patientId}`, { signal });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to trigger WhatsApp message");
    }
    
    return response.json();
};
