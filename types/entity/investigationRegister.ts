import { DoctorType } from "./doctor";
import { InvestigationType } from "./investigation";
import { PatientType } from "./patient";

export interface InvestigationRegisterType {
    id?: number;
    patient: PatientType;
    doctor: DoctorType;
    investigations: InvestigationType[];
    cost: number;
    date: Date;
    isPrinted: boolean;
    isDataAdded: boolean;
}