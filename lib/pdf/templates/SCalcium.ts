import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getSCalciumTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {
    const sCalciumTemplate: ReportTemplate = {
        id: 'scalcium-report',
        name: 'Serum Calcium Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'TOTAL CALCIUM',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{totalCalciumValue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'totalCalciumValue'
            },
            {
                text: 'mmol/L',
                x: 305,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{totalCalciumValueFlag}}',
                x: 365,
                y: 240,
                fontSize: 10,
                placeholder: 'totalCalciumValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 38, patientDateOfBirth, patientGender, 'mmol/L'),
                x: 430,
                y: 240,
                fontSize: 10,
            },
            {
                text: 'IONIZED CALCIUM',
                x: 50,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{ionizedCalciumValue}}',
                x: 240,
                y: 260,
                fontSize: 10,
                placeholder: 'ionizedCalciumValue'
            },
            {
                text: 'mmol/L',
                x: 305,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{ionizedCalciumValueFlag}}',
                x: 365,
                y: 260,
                fontSize: 10,
                placeholder: 'ionizedCalciumValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 39, patientDateOfBirth, patientGender, 'mmol/L'),
                x: 430,
                y: 260,
                fontSize: 10,
            },
        ]
    };

    return sCalciumTemplate;
}