import { PatientType } from "./entity/patient";

export interface SearchBoxItem {
    id?: number;
    name: string;
}

export interface InvestigationFormProps {
    patient: PatientType;
    investigationRegisterId: number;
    investigationId: number;
}

export interface NormalRangesDto {
    id?: number;
    investigationId: number;
    fieldName: string;
    normalRanges: NormalRangeType[];
}

export interface NormalRangeType {
    id?: string;
    genders: ("Male" | "Female" | "Other")[],
    ageLowerBound: number,
    ageUpperBound: number,
    valueLowerBound: number,
    valueUpperBound: number
}
