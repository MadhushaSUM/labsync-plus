import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';


export function getRBSTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {

    const rbsTemplate: ReportTemplate = {
        id: 'rbs-report',
        name: 'Random Blood Sugar Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'RANDOM BLOOD SUGAR (RBS)',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{rbsValue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'rbsValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{rbsValueFlag}}',
                x: 365,
                y: 240,
                fontSize: 10,
                placeholder: 'rbsValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 2, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 240,
                fontSize: 10,
            },
        ]
    };

    return rbsTemplate;
}