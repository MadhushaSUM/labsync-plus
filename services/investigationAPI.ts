import { NormalRangesDto } from "@/types/commonTypes";

const API_BASE_URL = process.env.NEXT_PUBLIC_INVESTIGATION_REGISTER_BASE_URL;

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