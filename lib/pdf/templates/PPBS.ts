import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';


export function getPPBSTemplate(patientDateOfBirth: Date, patientGender: string, isBr: boolean, isLn: boolean, isDn: boolean, normalRanges?: NormalRange[]) {

    const fbsTemplate: ReportTemplate = {
        id: 'ppbs-report',
        name: 'Post Prandial Blood Sugar Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: []
    };

    let yPosition = 240;
    if (isBr) {
        fbsTemplate.elements.push(
            {
                text: 'PPBS (BREAKFAST)',
                x: 50,
                y: yPosition,
                fontSize: 10,
            },
            {
                text: '{{ppbsBfValue}}',
                x: 240,
                y: yPosition,
                fontSize: 10,
                placeholder: 'ppbsBfValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: yPosition,
                fontSize: 10,
            },
            {
                text: '{{ppbsBfValueFlag}}',
                x: 365,
                y: yPosition,
                fontSize: 10,
                placeholder: 'ppbsBfValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 3, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: yPosition,
                fontSize: 10,
            },
        );
        yPosition += 20;
    }

    if (isLn) {
        fbsTemplate.elements.push(
            {
                text: 'PPBS (LUNCH)',
                x: 50,
                y: yPosition,
                fontSize: 10,
            },
            {
                text: '{{ppbsLnValue}}',
                x: 240,
                y: yPosition,
                fontSize: 10,
                placeholder: 'ppbsLnValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: yPosition,
                fontSize: 10,
            },
            {
                text: '{{ppbsLnValueFlag}}',
                x: 365,
                y: yPosition,
                fontSize: 10,
                placeholder: 'ppbsLnValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 4, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: yPosition,
                fontSize: 10,
            },
        );
        yPosition += 20;
    }

    if (isDn) {
        fbsTemplate.elements.push(
            {
                text: 'PPBS (DINNER)',
                x: 50,
                y: yPosition,
                fontSize: 10,
            },
            {
                text: '{{ppbsDnValue}}',
                x: 240,
                y: yPosition,
                fontSize: 10,
                placeholder: 'ppbsLnValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: yPosition,
                fontSize: 10,
            },
            {
                text: '{{ppbsDnValueFlag}}',
                x: 365,
                y: yPosition,
                fontSize: 10,
                placeholder: 'ppbsDnValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 5, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: yPosition,
                fontSize: 10,
            },
        );
    }

    return fbsTemplate;
}