import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getSCreatinineTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {
    const screatinineTemplate: ReportTemplate = {
        id: 'screatinine-report',
        name: 'Serum Creatinine Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'SERUM CREATININE',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{sCreatinineValue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'sCreatinineValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{sCreatinineValueFlag}}',
                x: 365,
                y: 240,
                fontSize: 10,
                placeholder: 'sCreatinineValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 45, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 240,
                fontSize: 10,
            },
        ]
    };

    return screatinineTemplate;
}