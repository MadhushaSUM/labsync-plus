export interface InvestigationRegistryRequestDtoType {
    limit: number;
    skip: number;
    patientId?: number;
    startDate?: string;
    endDate?: string;
    refNumber?: number;
    branchId?: number;
}

export interface NewInvestigationRegistryRequestDtoType {
    date: Date;
    patient_id: number;
    doctor_id?: number;
    investigations: number[],
    totalCost: number;
    paid: number;
    branch_id: number;
    refNumber?: number;
    version: number;
}

export interface UpdateRegistrationRequestDtoType {
    id: number;
    patient_id: number;
    doctor_id?: number;
    refNumber: number | null;
    date: Date;
    investigations: number[],
    totalCost: number;
    paid: number;
    collected: boolean;
    branch_id: number;
    version: number;
}
