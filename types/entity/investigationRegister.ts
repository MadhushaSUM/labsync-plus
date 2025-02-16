import { BranchType } from "./branch";
import { DoctorType } from "./doctor";
import { InvestigationType, Test } from "./investigation";
import { PatientType } from "./patient";

export interface InvestigationRegisterType {
    id?: number;
    patient: PatientType;
    doctor: DoctorType;
    investigations: InvestigationType[];
    cost: number;
    registeredDate: string;
    printed: boolean;
    dataAdded: boolean;
}


export interface RegisteredTest {
    test: Test;
    doctor: DoctorType | null;
    data: Record<string, any>;
    options: Record<string, any>;
    data_added: boolean;
    printed: boolean;
    version: number;
}

export interface Registration {
    id: number;
    date: Date;
    patient: PatientType;
    ref_number?: number;
    total_cost: number;
    paid_price: number;
    collected: boolean;
    registeredTests: RegisteredTest[];
    branch: BranchType;
    version: number;
}