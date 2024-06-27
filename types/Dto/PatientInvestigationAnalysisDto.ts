export interface PatientInvestigationAnalysisDto {
    data: PatientHistoryEntry[];
}

interface PatientHistoryEntry {
    date: string;
    data: any;
}