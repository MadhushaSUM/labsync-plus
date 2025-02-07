import { addNormalRanges } from '@/services/investigationAPI';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NormalRange } from '@/types/entity/investigation';

const useAddNormalRangeRule = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (normalRanges: NormalRange) => addNormalRanges(normalRanges),
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
