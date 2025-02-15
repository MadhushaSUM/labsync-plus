import { UserType } from "@/types/entity/user";

export async function fetchUserById(id?: string) {
    if (!id) {
        throw new Error("user id must be defined!");

    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/users/${id}`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get user by id!");
    }

    const res = await response.json()
    return res.user as UserType;
}

export async function deleteSessionByUserId(userId?: number) {
    if (!userId) {
        throw new Error("user id must be defined!");
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout?userId=${userId}`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete session!");
    }

    return await response.json()
}