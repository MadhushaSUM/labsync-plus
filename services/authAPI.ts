
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