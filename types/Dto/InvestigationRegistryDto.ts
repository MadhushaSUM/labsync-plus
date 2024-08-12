export interface InvestigationRegistryRequestDtoType {
    limit: number;
    offset: number;
}

export interface NewInvestigationRegistryRequestDtoType {
    patient_id: number;
    doctor_id: number;
    investigation_ids: number[];
    investigation_date: Date;
    investigation_cost: number;
}
