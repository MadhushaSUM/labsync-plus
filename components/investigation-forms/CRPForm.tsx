import { InvestigationRegisterType } from "@/types/entity/investigationRegister";

interface InvestigationFormProps {
    defaultValues: { [key: string]: any } | null;
    investigationRegisterId: number;
    investigationId: number;
}

export default function CRPForm({ defaultValues, investigationRegisterId, investigationId }: InvestigationFormProps) {
    return (
        <div>CRP Form</div>
    );
}