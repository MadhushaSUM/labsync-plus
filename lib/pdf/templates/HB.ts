import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getHBTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {
    const hbTemplate: ReportTemplate = {
        id: 'hb-report',
        name: 'Haemoglobin Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            // Haemoglobin
            {
                text: 'HAEMOGLOBIN',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{hbValue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'hbValue'
            },
            {
                text: 'g/dL',
                x: 305,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{hbValueFlag}}',
                x: 365,
                y: 240,
                fontSize: 10,
                placeholder: 'hbValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 33, patientDateOfBirth, patientGender, 'g/dL'),
                x: 430,
                y: 240,
                fontSize: 10,
            },
        ]
    };

    return hbTemplate;
}