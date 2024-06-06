import { InvestigationRegistryRequestDtoType, NewInvestigationRegistryRequestDtoType } from "@/types/Dto/InvestigationRegistryDto";
import { InvestigationRegisterType } from "@/types/entity/investigationRegister";

const API_BASE_URL = process.env.NEXT_PUBLIC_INVESTIGATION_REGISTER_BASE_URL;

export const fetchInvestigationRegistrations = async ({ limit, skip }: InvestigationRegistryRequestDtoType, signal: AbortSignal) => {    
    const response = await fetch(`${API_BASE_URL}/investigationRegister/getAll?limit=${limit}&skip=${skip}`, { signal });
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

    return response.json();
};

export const updateInvestigationRegistrations = async (investigationRegisterId: number, investigationRegisterData: NewInvestigationRegistryRequestDtoType, signal?: AbortSignal): Promise<InvestigationRegisterType> => {
    
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

    return response.json();
};