import { DoctorType } from "./doctor";
import { PatientType } from "./patient";

export interface InvestigationRegisterType {
    id?: number;
    patient: PatientType;
    doctor: DoctorType;
    investigations: number[];
    cost: number;
    date: string;
    printed: boolean;
    data_added_investigations: number[];
}