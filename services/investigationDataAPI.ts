const API_BASE_URL = process.env.NEXT_PUBLIC_INVESTIGATION_DATA_BASE_URL;

export const fetchInvestigationData = async (investigationRegisterId: number, investigationId: number, signal: AbortSignal) => {
    const response = await fetch(`${API_BASE_URL}/investigationData/get?investigationRegisterId=${investigationRegisterId}&investigationId=${investigationId}`, { signal });
    if (!response.ok) {
        throw new Error('Failed to fetch investigation data');
    }

    return response.json();
};