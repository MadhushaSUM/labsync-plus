import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getEGFRTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {
    const sCalciumTemplate: ReportTemplate = {
        id: 'egfr-report',
        name: 'EGFR Report',
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
                text: findTheCorrectNormalRangeRule(normalRanges, 46, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 240,
                fontSize: 10,
            },
            {
                text: 'e - GFR',
                x: 50,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{egfrValue}}',
                x: 240,
                y: 260,
                fontSize: 10,
                placeholder: 'egfrValue'
            },
            {
                text: 'ml/min/1.73m²',
                x: 305,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{egfrValueFlag}}',
                x: 365,
                y: 260,
                fontSize: 10,
                placeholder: 'egfrValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 47, patientDateOfBirth, patientGender, 'ml/min/1.73m²'),
                x: 430,
                y: 260,
                fontSize: 10,
            },
        ]
    };

    return sCalciumTemplate;
}