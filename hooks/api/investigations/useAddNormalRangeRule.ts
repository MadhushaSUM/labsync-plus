import { addNormalRanges } from '@/services/investigationAPI';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NormalRange } from '@/types/entity/investigation';
import { useCurrentUser } from '../auth/useCurrentUser';

const useAddNormalRangeRule = () => {
    const queryClient = useQueryClient();
    const currentUser = useCurrentUser();

    const mutation = useMutation({
        mutationFn: (normalRanges: NormalRange) => addNormalRanges(normalRanges, currentUser?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["normal-ranges"], exact: false });
        },
        onError: (error) => {
            console.error("Error updating normal range rules:", error);
        }
    });

    return mutation;
};

export default useAddNormalRangeRule;
