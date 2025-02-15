import { PatientRequestDtoType } from "@/types/Dto/patientDto";
import { BranchType } from "@/types/entity/branch";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchBranches = async ({ limit, skip, search }: PatientRequestDtoType, signal: AbortSignal, userId?: string) => {
    let params = `userId=${userId}&limit=${limit}&offset=${skip}`;
    if (search) {
        params += `&search=${search}`;
    }
    const response = await fetch(`${API_BASE_URL}/branches/all?${params}`, { signal });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch branches!");
    }

    return response.json();
};

export const addBranch = async (branch: BranchType, userId?: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/branches?userId=${userId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(branch)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to add branch");
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};

export const updateBranch = async (branchId: number, branchData: BranchType, signal?: AbortSignal, userId?: string): Promise<BranchType> => {
    try {
        const response = await fetch(`${API_BASE_URL}/branches/${branchId}?userId=${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(branchData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update branch");
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};