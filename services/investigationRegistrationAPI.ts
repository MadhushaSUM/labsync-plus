import { InvestigationRegistryRequestDtoType } from "@/types/Dto/InvestigationRegistryDto";

const API_BASE_URL = process.env.NEXT_PUBLIC_INVESTIGATION_REGISTER_BASE_URL;

export const fetchInvestigationRegistrations = async ({ limit, skip }: InvestigationRegistryRequestDtoType, signal: AbortSignal) => {    
    const response = await fetch(`${API_BASE_URL}/investigationRegister/getAll?limit=${limit}&skip=${skip}`, { signal });
    if (!response.ok) {
        throw new Error('Failed to fetch investigation registry');
    }

    return response.json();
};