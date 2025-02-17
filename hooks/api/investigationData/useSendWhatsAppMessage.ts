import { useMutation } from "@tanstack/react-query";
import { useCurrentUser } from "../auth/useCurrentUser";
import { triggerWhatsAppMessage } from "@/services/investigationDataAPI";

const useSendWhatsAppMessage = () => {
    const currentUser = useCurrentUser();

    const mutation = useMutation({
        mutationFn: ({ investigationRegisterId, investigationId, patientId, signal }: { investigationRegisterId: number; investigationId: number; patientId: number; signal?: AbortSignal }) =>
            triggerWhatsAppMessage(investigationRegisterId, investigationId, patientId, signal, currentUser?.id),

        onError: (error) => {
            console.error("Error sending WhatsApp message:", error);
        }
    });

    return mutation;
};

export default useSendWhatsAppMessage;
