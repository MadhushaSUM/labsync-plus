import { PatientAnalysisDataRequestDto, TestAnalysisDataRequestDto } from "@/types/Dto/InvestigationData";

const API_BASE_URL = process.env.NEXT_PUBLIC_INVESTIGATION_DATA_BASE_URL;

export const fetchInvestigationData = async (investigationRegisterId: number, investigationId: number, signal: AbortSignal) => {
    const response = await fetch(`${API_BASE_URL}/investigationData/get?investigationRegisterId=${investigationRegisterId}&investigationId=${investigationId}`, { signal });
    if (!response.ok) {
        throw new Error('Failed to fetch investigation data');
    }

    return response.json();
};

export const fetchPatientInvestigationData = async (
    query: PatientAnalysisDataRequestDto, 
    signal: AbortSignal
) => {
    const response = await fetch(`${API_BASE_URL}/investigationData/patient-analysis?patientId=${query.patientId}&investigationId=${query.investigationId}&startDate=${query.startDate}&endDate=${query.endDate}`, { signal });
    if (!response.ok) {
        throw new Error('Failed to fetch investigation data for patient analysis');
    }

    return response.json();
};

export const fetchTestAnalysisOverview = async (
    query: TestAnalysisDataRequestDto,
    signal: AbortSignal
) => {
    const response = await fetch(`${API_BASE_URL}/investigationData/test-analysis-overview?startDate=${query.startDate}&endDate=${query.endDate}`, { signal });
    if (!response.ok) {
        throw new Error('Failed to fetch test analysis data');
    }

    return response.json();
}