import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getSProteinsTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {
    const sProteinsTemplate: ReportTemplate = {
        id: 'sproteins-report',
        name: 'Serum Proteins Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            // Total Protein
            {
                text: 'TOTAL PROTEIN',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{totalProteinsValue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'totalProteinsValue'
            },
            {
                text: 'g/dl',
                x: 305,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{totalProteinsValueFlag}}',
                x: 365,
                y: 240,
                fontSize: 10,
                placeholder: 'totalProteinsValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 61, patientDateOfBirth, patientGender, 'g/dl'),
                x: 430,
                y: 240,
                fontSize: 10,
            },

            // Albumin
            {
                text: 'ALBUMIN',
                x: 50,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{albuminValue}}',
                x: 240,
                y: 260,
                fontSize: 10,
                placeholder: 'albuminValue'
            },
            {
                text: 'g/dl',
                x: 305,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{albuminValueFlag}}',
                x: 365,
                y: 260,
                fontSize: 10,
                placeholder: 'albuminValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 62, patientDateOfBirth, patientGender, 'g/dl'),
                x: 430,
                y: 260,
                fontSize: 10,
            },

            // Globulin
            {
                text: 'GLOBULIN',
                x: 50,
                y: 280,
                fontSize: 10,
            },
            {
                text: '{{globulinValue}}',
                x: 240,
                y: 280,
                fontSize: 10,
                placeholder: 'globulinValue'
            },
            {
                text: 'g/dl',
                x: 305,
                y: 280,
                fontSize: 10,
            },
            {
                text: '{{globulinValueFlag}}',
                x: 365,
                y: 280,
                fontSize: 10,
                placeholder: 'globulinValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 63, patientDateOfBirth, patientGender, 'g/dl'),
                x: 430,
                y: 280,
                fontSize: 10,
            },

            // A/G Ratio
            {
                text: 'ALBUMIN/GLOBULIN RATIO',
                x: 50,
                y: 300,
                fontSize: 10,
            },
            {
                text: '{{agRatioValue}}',
                x: 240,
                y: 300,
                fontSize: 10,
                placeholder: 'agRatioValue'
            },
        ]
    };

    return sProteinsTemplate;
}