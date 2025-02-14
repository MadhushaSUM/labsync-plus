import { PatientRequestDtoType } from "@/types/Dto/patientDto";
import { UserType } from "@/types/entity/user";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const addUser = async (user: { name: string, email: string, password: string }) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to register new user");
        }

        return response;
    } catch (error) {
        throw error;
    }
};

export const fetchUsers = async ({ limit, skip, search }: PatientRequestDtoType, signal: AbortSignal) => {
    let params = `limit=${limit}&offset=${skip}`;
    if (search) {
        params += `&search=${search}`;
    }
    const response = await fetch(`${API_BASE_URL}/auth/users/all?${params}`, { signal });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch users");
    }

    return response.json();
};

export const updateUser = async (userId: number, userData: UserType, signal?: AbortSignal): Promise<UserType> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update user");
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};