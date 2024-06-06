export interface InvestigationRegistryRequestDtoType {
    limit: number;
    skip: number;
}

export interface NewInvestigationRegistryRequestDtoType {
    patient_id: number;
    doctor_id: number;
    investigation_ids: number[];
    investigation_date: Date;
    investigation_cost: number;
}
