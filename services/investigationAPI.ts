import { NormalRangesDto } from "@/types/commonTypes";
import { PatientRequestDtoType } from "@/types/Dto/patientDto";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchInvestigations = async ({ limit, skip, search }: PatientRequestDtoType, signal: AbortSignal) => {
    let params = `limit=${limit}&offset=${skip}`;
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

export const fetchNormalRangesByInvestigationId = async (investigationId: number, signal: AbortSignal) => {
    const response = await fetch(`${API_BASE_URL}/investigation/normal-range-rules?investigationId=${investigationId}`, { signal });

    if (!response.ok) {
        throw new Error('Failed to fetch normal ranges by id');
    }

    return response.json();
};

export const addNormalRanges = async (normalRanges: NormalRangesDto) => {
    const response = await fetch(`${API_BASE_URL}/investigation/normal-range-rules`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(normalRanges)
    });
    if (!response.ok) {
        throw new Error('Failed to add investigation normal range rule');
    }

    return response;
};