const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchAuditTrails = async ({ limit, skip, startDate, endDate }: { limit: number, skip: number, startDate?: string, endDate?: string }, signal: AbortSignal) => {
    let params = `limit=${limit}&offset=${skip}`;
    if (startDate) {
        params += `&startDate=${startDate}`;
    }
    if (endDate) {
        params += `&endDate=${endDate}`;
    }
    const response = await fetch(`${API_BASE_URL}/audit-trail?${params}`, { signal });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch trail records");
    }

    return response.json();
};
