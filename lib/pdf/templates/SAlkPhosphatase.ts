import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getSAlkPhosphataseTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {
    const sAlkPhosphataseTemplate: ReportTemplate = {
        id: 'salkphosphatase-report',
        name: 'Serum Alkaline Phosphatase Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'SERUM ALKALINE PHOSPHATASE',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{sAlkalinePhosValue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'sAlkalinePhosValue'
            },
            {
                text: 'U/L',
                x: 305,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{sAlkalinePhosValueFlag}}',
                x: 365,
                y: 240,
                fontSize: 10,
                placeholder: 'sAlkalinePhosValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 44, patientDateOfBirth, patientGender, 'U/L'),
                x: 430,
                y: 240,
                fontSize: 10,
            },
        ]
    };

    return sAlkPhosphataseTemplate;
}