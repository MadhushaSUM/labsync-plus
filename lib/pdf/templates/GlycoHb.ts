import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getGlycoHbTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {
    const glycoHbTemplate: ReportTemplate = {
        id: 'glycohb-report',
        name: 'GlycoHb Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            // Gamma GT 
            {
                text: 'HbA1c',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{glycoHBValue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'glycoHBValue'
            },
            {
                text: '%',
                x: 305,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{glycoHBValueFlag}}',
                x: 365,
                y: 240,
                fontSize: 10,
                placeholder: 'glycoHBValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 69, patientDateOfBirth, patientGender, '%'),
                x: 430,
                y: 240,
                fontSize: 10,
            },

            {
                text: 'MEAN BLOOD GLUCOSE',
                x: 50,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{meanBloodGlucoseValue}}',
                x: 240,
                y: 260,
                fontSize: 10,
                placeholder: 'meanBloodGlucoseValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{meanBloodGlucoseValueFlag}}',
                x: 365,
                y: 260,
                fontSize: 10,
                placeholder: 'meanBloodGlucoseValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 70, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 260,
                fontSize: 10,
            },
        ]
    };

    return glycoHbTemplate;
}