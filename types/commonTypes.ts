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
    investigationId: number;
    data: {
        fieldName: string;
        normalRanges: NormalRangeType[]
    }[]
}

export interface NormalRangeType {
    gender: string[],
    ageLowerBound: number,
    ageUpperBound: number,
    valueLowerBound: number,
    valueUpperBound: number
}

