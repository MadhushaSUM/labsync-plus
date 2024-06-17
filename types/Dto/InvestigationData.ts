
export interface AddInvestigationDataRequestDto {
    investigationId: number;
    investigationRegisterId: number;
    investigationData: {[key: string]: any};
}

export interface UpdateInvestigationDataRequestDto {
    investigationDataId: number;
    investigationId: number;
    investigationRegisterId: number;
    investigationData: {[key: string]: any};
}

export interface PatientAnalysisDataRequestDto {
    patientId: number;
    investigationId: number;
    startDate: string;
    endDate: string;
}