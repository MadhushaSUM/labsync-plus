import { PatientRequestDtoType } from "@/types/Dto/patientDto";
import { NormalRange, Test } from "@/types/entity/investigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchInvestigations = async ({ limit, skip, search }: PatientRequestDtoType, signal: AbortSignal, userId?: string) => {
    let params = `userId=${userId}&limit=${limit}&offset=${skip}`;
    if (search) {
        params += `&search=${search}`;
    }
    const response = await fetch(`${API_BASE_URL}/investigations/all?${params}`, { signal });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch investigations");
    }

    return response.json();
}

export const fetchInvestigationFields = async (testId: number, signal: AbortSignal, userId?: string) => {
    const response = await fetch(`${API_BASE_URL}/investigations/fields?userId=${userId}&testId=${testId}`, { signal });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch investigation fields");
    }

    return response.json();
}

export const fetchNormalRangesByInvestigationId = async (testId: number, signal: AbortSignal, userId?: string) => {
    const response = await fetch(`${API_BASE_URL}/investigations/normal-ranges/investigation?userId=${userId}&testId=${testId}`, { signal });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch normal ranges investigation id");
    }

    return response.json();
};

export const fetchNormalRangesByInvestigationFieldId = async (testFieldId: number, signal: AbortSignal, userId?: string) => {
    const response = await fetch(`${API_BASE_URL}/investigations/normal-ranges/field?userId=${userId}&testFieldId=${testFieldId}`, { signal });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch normal ranges investigation field id");
    }

    return response.json();
};

export const addNormalRanges = async (normalRanges: NormalRange, userId?: string) => {
    const response = await fetch(`${API_BASE_URL}/investigations/normal-ranges?userId=${userId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(normalRanges)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch normal ranges investigation field id");
    }

    return response;
};

export const updateInvestigationPrice = async (id: number, investigation: Test, signal?: AbortSignal, userId?: string): Promise<Test> => {
    try {
        const response = await fetch(`${API_BASE_URL}/investigations/price/${id}?userId=${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(investigation),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update investigation price");
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};