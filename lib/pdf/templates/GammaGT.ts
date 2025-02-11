import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getGammaGTTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {
    const gammaGTTemplate: ReportTemplate = {
        id: 'gammagt-report',
        name: 'GammaGT Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            // Gamma GT
            {
                text: 'GAMMA GT',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{gammaGtValue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'gammaGtValue'
            },
            {
                text: 'U/L',
                x: 305,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{gammaGtValueFlag}}',
                x: 365,
                y: 240,
                fontSize: 10,
                placeholder: 'gammaGtValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 68, patientDateOfBirth, patientGender, 'U/L'),
                x: 430,
                y: 240,
                fontSize: 10,
            },
        ]
    };

    return gammaGTTemplate;
}