import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getBloodUreaTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {
    const hbTemplate: ReportTemplate = {
        id: 'bloodurea-report',
        name: 'Blood Urea Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'BLOOD UREA',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{bloodUreaValue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'bloodUreaValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{bloodUreaValueFlag}}',
                x: 365,
                y: 240,
                fontSize: 10,
                placeholder: 'bloodUreaValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 60, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 240,
                fontSize: 10,
            },
        ]
    };

    return hbTemplate;
}