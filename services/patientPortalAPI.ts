const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchPatientPortalData = async (
    queryString: string,
    signal: AbortSignal,
) => {
    const response = await fetch(`${API_BASE_URL}/patient-portal?s=${queryString}`, { signal });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch patient portal data!");
    }

    return response.json();
};