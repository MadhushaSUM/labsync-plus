export interface InvestigationType {
    id: number;
    name: string,
    code: string,
    specimen: string
}

export interface Test {
    id: number;
    name: string;
    code: string;
    price: number;
    version: number;
}

export interface DataEmptyTests {
    testRegisterId: number;
    testId: number;
    date: Date;
    testName: string;
    patientId: number;
    patientName: string;
    patientDOB: Date;
    patientGender: string;
    options: Record<string, any>;
    ref_number?: number;
    doctorId?: number;
    doctorName?: string;
    data?: Record<string, any>;
}