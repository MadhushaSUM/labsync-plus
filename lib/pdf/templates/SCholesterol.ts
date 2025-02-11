import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getSCholesterolTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {
    const SCholesterolTemplate: ReportTemplate = {
        id: 'scholesterol-report',
        name: 'Serum Cholesterol Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'SERUM CHOLESTEROL',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{sCholesterolValue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'sCholesterolValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{sCholesterolValueFlag}}',
                x: 365,
                y: 240,
                fontSize: 10,
                placeholder: 'sCholesterolValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 42, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 240,
                fontSize: 10,
            },
        ]
    };

    return SCholesterolTemplate;
}