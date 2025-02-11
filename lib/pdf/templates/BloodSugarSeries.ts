import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';


export function getBloodSugarSeriesTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {

    const bloodSugarSeriesTemplate: ReportTemplate = {
        id: 'bloodsugarseries-report',
        name: 'Blood Sugar Series Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'FBS',
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
                text: findTheCorrectNormalRangeRule(normalRanges, 71, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 240,
                fontSize: 10,
            },

            {
                text: 'PPBS (POST BREAKFAST)',
                x: 50,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{ppbsPreBfValue}}',
                x: 240,
                y: 260,
                fontSize: 10,
                placeholder: 'ppbsPreBfValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{ppbsPreBfValueFlag}}',
                x: 365,
                y: 260,
                fontSize: 10,
                placeholder: 'ppbsPreBfValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 72, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 260,
                fontSize: 10,
            },

            {
                text: 'RBS (PRE LUNCH)',
                x: 50,
                y: 280,
                fontSize: 10,
            },
            {
                text: '{{rbsAfterLnValue}}',
                x: 240,
                y: 280,
                fontSize: 10,
                placeholder: 'rbsAfterLnValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 280,
                fontSize: 10,
            },
            {
                text: '{{rbsAfterLnValueFlag}}',
                x: 365,
                y: 280,
                fontSize: 10,
                placeholder: 'rbsAfterLnValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 73, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 280,
                fontSize: 10,
            },

            {
                text: 'PPBS (POST LUNCH)',
                x: 50,
                y: 300,
                fontSize: 10,
            },
            {
                text: '{{ppbsPreLnValue}}',
                x: 240,
                y: 300,
                fontSize: 10,
                placeholder: 'ppbsPreLnValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 300,
                fontSize: 10,
            },
            {
                text: '{{ppbsPreLnValueFlag}}',
                x: 365,
                y: 300,
                fontSize: 10,
                placeholder: 'ppbsPreLnValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 74, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 300,
                fontSize: 10,
            },

            {
                text: 'RBS (PRE DINNER)',
                x: 50,
                y: 320,
                fontSize: 10,
            },
            {
                text: '{{rbsAfterDnValue}}',
                x: 240,
                y: 320,
                fontSize: 10,
                placeholder: 'rbsAfterDnValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 320,
                fontSize: 10,
            },
            {
                text: '{{rbsAfterDnValueFlag}}',
                x: 365,
                y: 320,
                fontSize: 10,
                placeholder: 'rbsAfterDnValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 75, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 320,
                fontSize: 10,
            },

            {
                text: 'PPBS (POST DINNER)',
                x: 50,
                y: 340,
                fontSize: 10,
            },
            {
                text: '{{ppbsPreDnValue}}',
                x: 240,
                y: 340,
                fontSize: 10,
                placeholder: 'ppbsPreDnValue'
            },
            {
                text: '{{ppbsPreDnValueFlag}}',
                x: 365,
                y: 340,
                fontSize: 10,
                placeholder: 'ppbsPreDnValue'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 76, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 340,
                fontSize: 10,
            },
        ]
    };

    return bloodSugarSeriesTemplate;
}