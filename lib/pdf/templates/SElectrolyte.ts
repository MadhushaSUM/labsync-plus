import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getSElectrolyteTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {
    const sElectrolyteTemplate: ReportTemplate = {
        id: 'selectrolyte-report',
        name: 'Serum Electrolyte Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'SODIUM (Na+)',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{sodiumValue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'sodiumValue'
            },
            {
                text: 'mEq/L',
                x: 305,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{sodiumValueFlag}}',
                x: 365,
                y: 240,
                fontSize: 10,
                placeholder: 'sodiumValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 40, patientDateOfBirth, patientGender, 'mEq/L'),
                x: 430,
                y: 240,
                fontSize: 10,
            },
            {
                text: 'POTASSIUM (K+)',
                x: 50,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{potassiumValue}}',
                x: 240,
                y: 260,
                fontSize: 10,
                placeholder: 'potassiumValue'
            },
            {
                text: 'mEq/L',
                x: 305,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{potassiumValueFlag}}',
                x: 365,
                y: 260,
                fontSize: 10,
                placeholder: 'potassiumValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 41, patientDateOfBirth, patientGender, 'mEq/L'),
                x: 430,
                y: 260,
                fontSize: 10,
            },
        ]
    };

    return sElectrolyteTemplate;
}