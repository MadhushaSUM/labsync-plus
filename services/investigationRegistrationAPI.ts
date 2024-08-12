import { AddInvestigationDataRequestDto, TestAnalysisDataRequestDto, UpdateInvestigationDataRequestDto } from "@/types/Dto/InvestigationData";
import { InvestigationRegistryRequestDtoType, NewInvestigationRegistryRequestDtoType } from "@/types/Dto/InvestigationRegistryDto";
import { InvestigationRegisterType } from "@/types/entity/investigationRegister";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchInvestigationRegistrations = async ({ limit, offset }: InvestigationRegistryRequestDtoType, signal: AbortSignal) => {
    const response = await fetch(`${API_BASE_URL}/investigation-registration/all?filterUnconfirmed=false&limit=${limit}&offset=${offset}`, { signal });
    if (!response.ok) {
        throw new Error('Failed to fetch investigation registry');
    }

    return response.json();
};

export const addInvestigationRegistrations = async (investigationRegister: NewInvestigationRegistryRequestDtoType) => {
    const response = await fetch(`${API_BASE_URL}/investigationRegister/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(investigationRegister)
    });
    if (!response.ok) {
        throw new Error('Failed to add investigation registration');
    }

    return response;
};

export const updateInvestigationRegistrations = async (investigationRegisterId: number, investigationRegisterData: NewInvestigationRegistryRequestDtoType, signal?: AbortSignal) => {

    const response = await fetch(`${API_BASE_URL}/investigationRegister/update?id=${investigationRegisterId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(investigationRegisterData),
    });

    if (!response.ok) {
        throw new Error('Failed to update investigation registration');
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

export const updateInvestigationData = async (updatingData: UpdateInvestigationDataRequestDto) => {
    const response = await fetch(`${API_BASE_URL}/investigationRegister/updateInvestigationData`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatingData),
    });

    if (!response.ok) {
        throw new Error('Failed to update investigation data');
    }

    return response;
}

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