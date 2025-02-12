const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchPatientAnalysisData = async ({ patientId, startDate, endDate }: { patientId: number, startDate?: string, endDate?: string }, signal: AbortSignal) => {
    let params = `patientId=${patientId}`;

    if (startDate) {
        params += `&startDate=${startDate}`;
    }
    if (endDate) {
        params += `&endDate=${endDate}`;
    }

    const response = await fetch(`${API_BASE_URL}/analysis/patient?${params}`, { signal });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch patient analysis data!");
    }

    return response.json();
};