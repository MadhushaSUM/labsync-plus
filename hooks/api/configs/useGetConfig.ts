import { useQuery } from "@tanstack/react-query";
import { fetchConfigById } from "@/services/configAPI";
import { useCurrentUser } from "../auth/useCurrentUser";
import { ConfigType } from "@/types/entity/config";

const useGetConfig = (configId?: number) => {
    const controller = new AbortController();
    const { signal } = controller;
    const currentUser = useCurrentUser();

    return useQuery<{ content?: ConfigType }>({
        queryKey: ["configs",], // Unique cache key
        queryFn: () => {
            if (!configId) {
                return {};
            }
            return fetchConfigById(configId, signal, currentUser?.id)
        },
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
};

export default useGetConfig;
