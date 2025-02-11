

import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';


export function getOralGlucoseTemplate(patientDateOfBirth: Date, patientGender: string, isFbs: boolean, is1st: boolean, is2nd: boolean, normalRanges?: NormalRange[]) {

    const fbsTemplate: ReportTemplate = {
        id: 'oralGlucose-report',
        name: 'Oral Glucose Tolerance Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: []
    };

    let yPosition = 240;
    if (isFbs) {
        fbsTemplate.elements.push(
            {
                text: 'FBS',
                x: 50,
                y: yPosition,
                fontSize: 10,
            },
            {
                text: '{{fbsValue}}',
                x: 240,
                y: yPosition,
                fontSize: 10,
                placeholder: 'fbsValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: yPosition,
                fontSize: 10,
            },
            {
                text: '{{fbsValueFlag}}',
                x: 365,
                y: yPosition,
                fontSize: 10,
                placeholder: 'fbsValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 6, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: yPosition,
                fontSize: 10,
            },
        );
        yPosition += 20;
    }

    if (is1st) {
        fbsTemplate.elements.push(
            {
                text: '1ST HOUR',
                x: 50,
                y: yPosition,
                fontSize: 10,
            },
            {
                text: '{{firstHourValue}}',
                x: 240,
                y: yPosition,
                fontSize: 10,
                placeholder: 'firstHourValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: yPosition,
                fontSize: 10,
            },
            {
                text: '{{firstHourValueFlag}}',
                x: 365,
                y: yPosition,
                fontSize: 10,
                placeholder: 'firstHourValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 7, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: yPosition,
                fontSize: 10,
            },
        );
        yPosition += 20;
    }

    if (is2nd) {
        fbsTemplate.elements.push(
            {
                text: '2ND HOUR',
                x: 50,
                y: yPosition,
                fontSize: 10,
            },
            {
                text: '{{secondHourValue}}',
                x: 240,
                y: yPosition,
                fontSize: 10,
                placeholder: 'secondHourValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: yPosition,
                fontSize: 10,
            },
            {
                text: '{{secondHourValueFlag}}',
                x: 365,
                y: yPosition,
                fontSize: 10,
                placeholder: 'secondHourValue'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 8, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: yPosition,
                fontSize: 10,
            },
        );
    }

    return fbsTemplate;
}