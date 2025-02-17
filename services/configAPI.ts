import { ConfigType } from "@/types/entity/config";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchConfigById = async (configId: number, signal: AbortSignal, userId?: string) => {
    let params = `userId=${userId}&configId=${configId}`;

    const response = await fetch(`${API_BASE_URL}/configs?${params}`, { signal });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch config");
    }

    return response.json();
};

export const updateConfig = async (configId: number, config: Record<string, any>, userId?: string): Promise<ConfigType> => {
    const response = await fetch(`${API_BASE_URL}/configs?userId=${userId}&configId=${configId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(config)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add config");
    }

    return response.json();
};