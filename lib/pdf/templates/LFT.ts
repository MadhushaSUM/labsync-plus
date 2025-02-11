import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getLFTTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {
    const lftTemplate: ReportTemplate = {
        id: 'lft-report',
        name: 'Liver Function Test Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            // SGOT (AST)
            {
                text: 'S.G.O.T. (AST)',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{sgotValue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'sgotValue'
            },
            {
                text: 'U/L',
                x: 305,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{sgotValueFlag}}',
                x: 365,
                y: 240,
                fontSize: 10,
                placeholder: 'sgotValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 49, patientDateOfBirth, patientGender, 'U/L'),
                x: 430,
                y: 240,
                fontSize: 10,
            },

            // SGPT (ALT)
            {
                text: 'S.G.P.T. (ALT)',
                x: 50,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{sgptValue}}',
                x: 240,
                y: 260,
                fontSize: 10,
                placeholder: 'sgptValue'
            },
            {
                text: 'U/L',
                x: 305,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{sgptValueFlag}}',
                x: 365,
                y: 260,
                fontSize: 10,
                placeholder: 'sgptValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 50, patientDateOfBirth, patientGender, 'U/L'),
                x: 430,
                y: 260,
                fontSize: 10,
            },

            // Gamma GT
            {
                text: 'GAMMA GT',
                x: 50,
                y: 280,
                fontSize: 10,
            },
            {
                text: '{{gammaGtValue}}',
                x: 240,
                y: 280,
                fontSize: 10,
                placeholder: 'gammaGtValue'
            },
            {
                text: 'U/L',
                x: 305,
                y: 280,
                fontSize: 10,
            },
            {
                text: '{{gammaGtValueFlag}}',
                x: 365,
                y: 280,
                fontSize: 10,
                placeholder: 'gammaGtValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 59, patientDateOfBirth, patientGender, 'U/L'),
                x: 430,
                y: 280,
                fontSize: 10,
            },

            // Alkaline Phosphatase
            {
                text: 'SERUM ALKALINE PHOSPHATASE',
                x: 50,
                y: 300,
                fontSize: 10,
            },
            {
                text: '{{sAlkalinePhosValue}}',
                x: 240,
                y: 300,
                fontSize: 10,
                placeholder: 'sAlkalinePhosValue'
            },
            {
                text: 'U/L',
                x: 305,
                y: 300,
                fontSize: 10,
            },
            {
                text: '{{sAlkalinePhosValueFlag}}',
                x: 365,
                y: 300,
                fontSize: 10,
                placeholder: 'sAlkalinePhosValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 51, patientDateOfBirth, patientGender, 'U/L'),
                x: 430,
                y: 300,
                fontSize: 10,
            },

            // Total Bilirubin
            {
                text: 'TOTAL BILIRUBIN',
                x: 50,
                y: 320,
                fontSize: 10,
            },
            {
                text: '{{totalBilirubinValue}}',
                x: 240,
                y: 320,
                fontSize: 10,
                placeholder: 'totalBilirubinValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 320,
                fontSize: 10,
            },
            {
                text: '{{totalBilirubinValueFlag}}',
                x: 365,
                y: 320,
                fontSize: 10,
                placeholder: 'totalBilirubinValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 52, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 320,
                fontSize: 10,
            },

            // Direct Bilirubin
            {
                text: 'DIRECT BILIRUBIN',
                x: 50,
                y: 340,
                fontSize: 10,
            },
            {
                text: '{{directBilirubinValue}}',
                x: 240,
                y: 340,
                fontSize: 10,
                placeholder: 'directBilirubinValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 340,
                fontSize: 10,
            },
            {
                text: '{{directBilirubinValueFlag}}',
                x: 365,
                y: 340,
                fontSize: 10,
                placeholder: 'directBilirubinValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 53, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 340,
                fontSize: 10,
            },

            // Indirect Bilirubin
            {
                text: 'INDIRECT BILIRUBIN',
                x: 50,
                y: 360,
                fontSize: 10,
            },
            {
                text: '{{indirectBilirubinValue}}',
                x: 240,
                y: 360,
                fontSize: 10,
                placeholder: 'indirectBilirubinValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 360,
                fontSize: 10,
            },
            {
                text: '{{indirectBilirubinValueFlag}}',
                x: 365,
                y: 360,
                fontSize: 10,
                placeholder: 'indirectBilirubinValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 54, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 360,
                fontSize: 10,
            },

            // Total Protein
            {
                text: 'TOTAL PROTEIN',
                x: 50,
                y: 380,
                fontSize: 10,
            },
            {
                text: '{{totalProteinsValue}}',
                x: 240,
                y: 380,
                fontSize: 10,
                placeholder: 'totalProteinsValue'
            },
            {
                text: 'g/dl',
                x: 305,
                y: 380,
                fontSize: 10,
            },
            {
                text: '{{totalProteinsValueFlag}}',
                x: 365,
                y: 380,
                fontSize: 10,
                placeholder: 'totalProteinsValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 55, patientDateOfBirth, patientGender, 'g/dl'),
                x: 430,
                y: 380,
                fontSize: 10,
            },

            // Albumin
            {
                text: 'ALBUMIN',
                x: 50,
                y: 400,
                fontSize: 10,
            },
            {
                text: '{{albuminValue}}',
                x: 240,
                y: 400,
                fontSize: 10,
                placeholder: 'albuminValue'
            },
            {
                text: 'g/dl',
                x: 305,
                y: 400,
                fontSize: 10,
            },
            {
                text: '{{albuminValueFlag}}',
                x: 365,
                y: 400,
                fontSize: 10,
                placeholder: 'albuminValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 56, patientDateOfBirth, patientGender, 'g/dl'),
                x: 430,
                y: 400,
                fontSize: 10,
            },

            // Globulin
            {
                text: 'GLOBULIN',
                x: 50,
                y: 420,
                fontSize: 10,
            },
            {
                text: '{{globulinValue}}',
                x: 240,
                y: 420,
                fontSize: 10,
                placeholder: 'globulinValue'
            },
            {
                text: 'g/dl',
                x: 305,
                y: 420,
                fontSize: 10,
            },
            {
                text: '{{globulinValueFlag}}',
                x: 365,
                y: 420,
                fontSize: 10,
                placeholder: 'globulinValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 57, patientDateOfBirth, patientGender, 'g/dl'),
                x: 430,
                y: 420,
                fontSize: 10,
            },

            // A/G Ratio
            {
                text: 'ALBUMIN/GLOBULIN RATIO',
                x: 50,
                y: 440,
                fontSize: 10,
            },
            {
                text: '{{agRatioValue}}',
                x: 240,
                y: 440,
                fontSize: 10,
                placeholder: 'agRatioValue'
            },
        ]
    };

    return lftTemplate;
}