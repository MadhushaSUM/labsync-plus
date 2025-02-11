import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getFBCTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {
    const fullBloodCountTemplate: ReportTemplate = {
        id: 'fbc-report',
        name: 'Full Blood Count Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            // WBC
            {
                text: 'WHITE BLOOD CELLS (WBC)',
                x: 50,
                y: 240,
                fontSize: 10,
                fontWeight: 'bold'
            },
            {
                text: '{{wbcValue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'wbcValue'
            },
            {
                text: '10^9/L',
                x: 305,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{wbcValueFlag}}',
                x: 365,
                y: 240,
                fontSize: 10,
                placeholder: 'wbcValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 15, patientDateOfBirth, patientGender, '10^9/L'),
                x: 430,
                y: 240,
                fontSize: 10,
            },


            // Differential Count Header
            {
                text: 'DIFFERENTIAL COUNT',
                x: 50,
                y: 260,
                fontSize: 10,
                fontWeight: 'bold'
            },

            // Neutrophils
            {
                text: 'NEUTROPHILS',
                x: 60,
                y: 280,
                fontSize: 10,
            },
            {
                text: '{{neutrophilsValue}}',
                x: 240,
                y: 280,
                fontSize: 10,
                placeholder: 'neutrophilsValue'
            },
            {
                text: '%',
                x: 305,
                y: 280,
                fontSize: 10,
            },
            {
                text: '{{neutrophilsValueFlag}}',
                x: 365,
                y: 280,
                fontSize: 10,
                placeholder: 'neutrophilsValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 16, patientDateOfBirth, patientGender, '%'),
                x: 430,
                y: 280,
                fontSize: 10,
            },

            // Lymphocytes
            {
                text: 'LYMPHOCYTES',
                x: 60,
                y: 300,
                fontSize: 10,
            },
            {
                text: '{{lymphocytesValue}}',
                x: 240,
                y: 300,
                fontSize: 10,
                placeholder: 'lymphocytesValue'
            },
            {
                text: '%',
                x: 305,
                y: 300,
                fontSize: 10,
            },
            {
                text: '{{lymphocytesValueFlag}}',
                x: 365,
                y: 300,
                fontSize: 10,
                placeholder: 'lymphocytesValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 17, patientDateOfBirth, patientGender, '%'),
                x: 430,
                y: 300,
                fontSize: 10,
            },

            // Eosinophils
            {
                text: 'EOSINOPHILS',
                x: 60,
                y: 320,
                fontSize: 10,
            },
            {
                text: '{{eosinophilsValue}}',
                x: 240,
                y: 320,
                fontSize: 10,
                placeholder: 'eosinophilsValue'
            },
            {
                text: '%',
                x: 305,
                y: 320,
                fontSize: 10,
            },
            {
                text: '{{eosinophilsValueFlag}}',
                x: 365,
                y: 320,
                fontSize: 10,
                placeholder: 'eosinophilsValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 18, patientDateOfBirth, patientGender, '%'),
                x: 430,
                y: 320,
                fontSize: 10,
            },

            // Monocytes
            {
                text: 'MONOCYTES',
                x: 60,
                y: 340,
                fontSize: 10,
            },
            {
                text: '{{monocytesValue}}',
                x: 240,
                y: 340,
                fontSize: 10,
                placeholder: 'monocytesValue'
            },
            {
                text: '%',
                x: 305,
                y: 340,
                fontSize: 10,
            },
            {
                text: '{{monocytesValueFlag}}',
                x: 365,
                y: 340,
                fontSize: 10,
                placeholder: 'monocytesValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 19, patientDateOfBirth, patientGender, '%'),
                x: 430,
                y: 340,
                fontSize: 10,
            },

            // Basophils
            {
                text: 'BASOPHILS',
                x: 60,
                y: 360,
                fontSize: 10,
            },
            {
                text: '{{basophilsValue}}',
                x: 240,
                y: 360,
                fontSize: 10,
                placeholder: 'basophilsValue'
            },
            {
                text: '%',
                x: 305,
                y: 360,
                fontSize: 10,
            },
            {
                text: '{{basophilsValueFlag}}',
                x: 365,
                y: 360,
                fontSize: 10,
                placeholder: 'basophilsValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 20, patientDateOfBirth, patientGender, '%'),
                x: 430,
                y: 360,
                fontSize: 10,
            },

            // Haemoglobin
            {
                text: 'HAEMOGLOBIN',
                x: 50,
                y: 380,
                fontSize: 10,
            },
            {
                text: '{{heamoglobinValue}}',
                x: 240,
                y: 380,
                fontSize: 10,
                placeholder: 'heamoglobinValue'
            },
            {
                text: 'g/dL',
                x: 305,
                y: 380,
                fontSize: 10,
            },
            {
                text: '{{heamoglobinValueFlag}}',
                x: 365,
                y: 380,
                fontSize: 10,
                placeholder: 'heamoglobinValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 21, patientDateOfBirth, patientGender, 'g/dL'),
                x: 430,
                y: 380,
                fontSize: 10,
            },

            // RBC
            {
                text: 'RED BLOOD CELLS (RBC)',
                x: 50,
                y: 400,
                fontSize: 10,
            },
            {
                text: '{{rbcValue}}',
                x: 240,
                y: 400,
                fontSize: 10,
                placeholder: 'rbcValue'
            },
            {
                text: '10^12/L',
                x: 305,
                y: 400,
                fontSize: 10,
            },
            {
                text: '{{rbcValueFlag}}',
                x: 365,
                y: 400,
                fontSize: 10,
                placeholder: 'rbcValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 22, patientDateOfBirth, patientGender, '10^12/L'),
                x: 430,
                y: 400,
                fontSize: 10,
            },

            

            // HTC/PVC
            {
                text: 'HAEMATOCRIT (HTC/PVC)',
                x: 50,
                y: 420,
                fontSize: 10,
            },
            {
                text: '{{htcpvcValue}}',
                x: 240,
                y: 420,
                fontSize: 10,
                placeholder: 'htcpvcValue'
            },
            {
                text: '%',
                x: 305,
                y: 420,
                fontSize: 10,
            },
            {
                text: '{{htcpvcValueFlag}}',
                x: 365,
                y: 420,
                fontSize: 10,
                placeholder: 'htcpvcValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 23, patientDateOfBirth, patientGender, '%'),
                x: 430,
                y: 420,
                fontSize: 10,
            },

            // MCV
            {
                text: 'MCV',
                x: 50,
                y: 440,
                fontSize: 10,
            },
            {
                text: '{{mcvValue}}',
                x: 240,
                y: 440,
                fontSize: 10,
                placeholder: 'mcvValue'
            },
            {
                text: 'fL',
                x: 305,
                y: 440,
                fontSize: 10,
            },
            {
                text: '{{mcvValueFlag}}',
                x: 365,
                y: 440,
                fontSize: 10,
                placeholder: 'mcvValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 24, patientDateOfBirth, patientGender, 'fL'),
                x: 430,
                y: 440,
                fontSize: 10,
            },

            // MCH
            {
                text: 'MCH',
                x: 50,
                y: 460,
                fontSize: 10,
            },
            {
                text: '{{mchValue}}',
                x: 240,
                y: 460,
                fontSize: 10,
                placeholder: 'mchValue'
            },
            {
                text: 'pg',
                x: 305,
                y: 460,
                fontSize: 10,
            },
            {
                text: '{{mchValueFlag}}',
                x: 365,
                y: 460,
                fontSize: 10,
                placeholder: 'mchValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 25, patientDateOfBirth, patientGender, 'pg'),
                x: 430,
                y: 460,
                fontSize: 10,
            },

            // MCHC
            {
                text: 'MCHC',
                x: 50,
                y: 480,
                fontSize: 10,
            },
            {
                text: '{{mchcValue}}',
                x: 240,
                y: 480,
                fontSize: 10,
                placeholder: 'mchcValue'
            },
            {
                text: 'g/dL',
                x: 305,
                y: 480,
                fontSize: 10,
            },
            {
                text: '{{mchcValueFlag}}',
                x: 365,
                y: 480,
                fontSize: 10,
                placeholder: 'mchcValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 26, patientDateOfBirth, patientGender, 'g/dL'),
                x: 430,
                y: 480,
                fontSize: 10,
            },

            // Platelets
            {
                text: 'PLATELETS',
                x: 50,
                y: 500,
                fontSize: 10,
                fontWeight: 'bold',
            },
            {
                text: '{{plateletValue}}',
                x: 240,
                y: 500,
                fontSize: 10,
                placeholder: 'plateletValue'
            },
            {
                text: '10^9/L',
                x: 305,
                y: 500,
                fontSize: 10,
            },
            {
                text: '{{plateletValueFlag}}',
                x: 365,
                y: 500,
                fontSize: 10,
                placeholder: 'plateletValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 27, patientDateOfBirth, patientGender, '10^9/L'),
                x: 430,
                y: 500,
                fontSize: 10,
            },
        ]
    };

    return fullBloodCountTemplate;
}