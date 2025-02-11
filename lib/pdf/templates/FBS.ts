import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';


export function getFBSTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {

    const fbsTemplate: ReportTemplate = {
        id: 'fbs-report',
        name: 'Fasting Blood Sugar Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'FASTING BLOOD SUGAR (FBS)',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{fbsValue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'fbsValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{fbsValueFlag}}',
                x: 365,
                y: 240,
                fontSize: 10,
                placeholder: 'fbsValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 1, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 240,
                fontSize: 10,
            },
        ]
    };

    return fbsTemplate;
}