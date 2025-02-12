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

export interface TestField {
    id: number;
    test_id: number;
    name: string;
    code: string;
    vestion: number;
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
    version: number;
}

export interface FlattenedDataEmptyTests {
    testRegisterId: number;
    testId: number;
    date: string | Date;
    testName: string;
    patientId: number;
    patientName: string;
    patientDOB: Date;
    patientGender: string;
    options: Record<string, any>;
    ref_number?: number;
    doctorId?: number;
    doctorName?: string;
    version: number;
    [key: string]: any;
}

export interface NormalRange {
    id?: number;
    test_id: number;
    test_field_id: number;
    rules: object[];
    version: number;
}

export interface AnalysisData {
    totalTestNumber: number,
    pieChartData: {
        testId: number,
        testName: string,
        count: number,
        tests: {
            date: Date,
            refNumber?: number,
            testRegisterId: number,
            data?: object,
        }[]
    }[],
}

export interface FinancialAnalysisOutput {
    totalCost: number;
    totalPaid: number;
    periods: {
        startDate: Date;
        endDate: Date;
        periodCost: number;
        periodPaid: number;
        tests: {
            testId: number;
            testName: string;
            testTotalCost: number;
        }[]
    }[]
}