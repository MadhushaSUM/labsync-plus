import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/services/authAPI";
import { UserType } from "@/types/entity/user";

const useUpdateUser = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ userId, userData, signal }: { userId: number; userData: UserType; signal?: AbortSignal }) =>
            updateUser(userId, userData, signal),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
        },

        onError: (error) => {
            console.error("Error updating user:", error);
        }
    });

    return mutation;
};

export default useUpdateUser;
