import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "@/services/authAPI";

const useRegisterUser = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (user: { name: string, email: string, password: string }) => addUser(user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
        },
        onError: (error) => {
            console.error("Error registering new user:", error);
        },
    });

    return mutation;
};

export default useRegisterUser;
