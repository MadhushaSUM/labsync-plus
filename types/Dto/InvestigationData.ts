
export interface AddInvestigationDataRequestDto {
    investigationId: number;
    investigationRegisterId: number;
    investigationData: {[key: string]: any};
}