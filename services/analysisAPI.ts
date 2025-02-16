const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchPatientAnalysisData = async ({ patientId, startDate, endDate }: { patientId: number, startDate?: string, endDate?: string }, signal: AbortSignal, userId?: string, branchId?: number) => {
    let params = `userId=${userId}&patientId=${patientId}`;

    if (startDate) {
        params += `&startDate=${startDate}`;
    }
    if (endDate) {
        params += `&endDate=${endDate}`;
    }
    if (branchId) {
        params += `&branchId=${branchId}`;
    }

    const response = await fetch(`${API_BASE_URL}/analysis/patient?${params}`, { signal });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch patient analysis data!");
    }

    return response.json();
};

export const fetchInvestigationAnalysisData = async ({ startDate, endDate }: { startDate?: string, endDate?: string }, signal: AbortSignal, userId?: string, branchId?: number) => {
    let params = `?userId=${userId}`;

    if (startDate) {
        params += `&startDate=${startDate}`;
    }
    if (endDate) {
        params += `&endDate=${endDate}`;
    }
    if (branchId) {
        params += `&branchId=${branchId}`;
    }

    const response = await fetch(`${API_BASE_URL}/analysis/investigation${params}`, { signal });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch investigation analysis data!");
    }

    return response.json();
};

export const fetchFinancialAnalysisData = async ({ step, startDate, endDate }: { step: string, startDate?: string, endDate?: string }, signal: AbortSignal, userId?: string, branchId?: number) => {
    let params = `userId=${userId}&step=${step}`;

    if (startDate) {
        params += `&startDate=${startDate}`;
    }
    if (endDate) {
        params += `&endDate=${endDate}`;
    }
    if (branchId) {
        params += `&branchId=${branchId}`;
    }

    const response = await fetch(`${API_BASE_URL}/analysis/financial?${params}`, { signal });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch financial analysis data!");
    }

    return response.json();
};