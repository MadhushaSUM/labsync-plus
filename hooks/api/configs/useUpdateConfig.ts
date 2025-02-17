import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from '../auth/useCurrentUser';
import { updateConfig } from '@/services/configAPI';

const useUpdateConfig = () => {
    const queryClient = useQueryClient();
    const currentUser = useCurrentUser();

    const mutation = useMutation({
        mutationFn: ({ configId, config, signal }: { configId: number; config: Record<string, any>; signal?: AbortSignal }) =>
            updateConfig(configId, config, currentUser?.id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["configs"], exact: false });
        },

        onError: (error) => {
            console.error("Error updating config:", error);
        }
    });

    return mutation;
};

export default useUpdateConfig;
