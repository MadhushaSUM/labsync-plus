import { AddInvestigationDataRequestDto, TestAnalysisDataRequestDto, UpdateInvestigationDataRequestDto } from "@/types/Dto/InvestigationData";
import { InvestigationRegistryRequestDtoType, NewInvestigationRegistryRequestDtoType, UpdateRegistrationRequestDtoType } from "@/types/Dto/InvestigationRegistryDto";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchInvestigationRegistrations = async ({ limit, skip, patientId, startDate, endDate, refNumber }: InvestigationRegistryRequestDtoType, signal: AbortSignal) => {
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

    const response = await fetch(`${API_BASE_URL}/investigation-registration/all?${params}`, { signal });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch registrations");
    }

    return response.json();
};

export const addInvestigationRegistrations = async (investigationRegister: NewInvestigationRegistryRequestDtoType) => {
    const response = await fetch(`${API_BASE_URL}/investigation-registration`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(investigationRegister)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add registration");
    }

    return response;
};

export const updateInvestigationRegistrations = async (investigationRegisterId: number, investigationRegisterData: UpdateRegistrationRequestDtoType, signal?: AbortSignal) => {

    const response = await fetch(`${API_BASE_URL}/investigation-registration/${investigationRegisterId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(investigationRegisterData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update registration");
    }

    return response;
};

export const addInvestigationData = async (investigationData: AddInvestigationDataRequestDto) => {
    const response = await fetch(`${API_BASE_URL}/investigationRegister/addInvestigationData`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(investigationData)
    });
    if (!response.ok) {
        throw new Error('Failed to add investigation data');
    }

    return response;
};

export const fetchTestAnalysisOverview = async (
    query: TestAnalysisDataRequestDto,
    signal: AbortSignal
) => {
    const response = await fetch(`${API_BASE_URL}/investigationRegister/test-analysis-overview?startDate=${query.startDate}&endDate=${query.endDate}`, { signal });
    if (!response.ok) {
        throw new Error('Failed to fetch test analysis data');
    }

    return response.json();
}