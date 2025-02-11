import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getRCholesterolTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {
    const rcholesterolTemplate: ReportTemplate = {
        id: 'rcholesterol-report',
        name: 'Random Cholesterol Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'RANDOM CHOLESTEROL',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{rCholesterolValue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'rCholesterolValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{rCholesterolValueFlag}}',
                x: 365,
                y: 240,
                fontSize: 10,
                placeholder: 'rCholesterolValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 43, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 240,
                fontSize: 10,
            },
        ]
    };

    return rcholesterolTemplate;
}