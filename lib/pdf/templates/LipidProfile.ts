import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';


export function getLipidProfileTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {

    const lipidProfileTemplate: ReportTemplate = {
        id: 'fbs-report',
        name: 'Fasting Blood Sugar Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'TOTAL CHOLESTEROL',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{totalCholesterolValue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'totalCholesterolValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{totalCholesterolValueFlag}}',
                x: 365,
                y: 240,
                fontSize: 10,
                placeholder: 'totalCholesterolValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 9, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 240,
                fontSize: 10,
            },

            {
                text: 'TRIGLYCERIDS',
                x: 50,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{triglyceridsValue}}',
                x: 240,
                y: 260,
                fontSize: 10,
                placeholder: 'triglyceridsValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{triglyceridsValueFlag}}',
                x: 365,
                y: 260,
                fontSize: 10,
                placeholder: 'triglyceridsValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 10, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 260,
                fontSize: 10,
            },

            {
                text: 'HDL CHOLESTEROL',
                x: 50,
                y: 280,
                fontSize: 10,
            },
            {
                text: '{{hdlCholesterolValue}}',
                x: 240,
                y: 280,
                fontSize: 10,
                placeholder: 'hdlCholesterolValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 280,
                fontSize: 10,
            },
            {
                text: '{{hdlCholesterolValueFlag}}',
                x: 365,
                y: 280,
                fontSize: 10,
                placeholder: 'hdlCholesterolValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 11, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 280,
                fontSize: 10,
            },

            {
                text: 'LDL CHOLESTEROL',
                x: 50,
                y: 300,
                fontSize: 10,
            },
            {
                text: '{{ldlCholesterolValue}}',
                x: 240,
                y: 300,
                fontSize: 10,
                placeholder: 'ldlCholesterolValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 300,
                fontSize: 10,
            },
            {
                text: '{{ldlCholesterolValueFlag}}',
                x: 365,
                y: 300,
                fontSize: 10,
                placeholder: 'ldlCholesterolValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 12, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 300,
                fontSize: 10,
            },

            {
                text: 'VLDL CHOLESTEROL',
                x: 50,
                y: 320,
                fontSize: 10,
            },
            {
                text: '{{vldlCholesterolValue}}',
                x: 240,
                y: 320,
                fontSize: 10,
                placeholder: 'vldlCholesterolValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 320,
                fontSize: 10,
            },
            {
                text: '{{vldlCholesterolValueFlag}}',
                x: 365,
                y: 320,
                fontSize: 10,
                placeholder: 'vldlCholesterolValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 13, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 320,
                fontSize: 10,
            },

            {
                text: 'TOTAL CHOL. / HDL',
                x: 50,
                y: 340,
                fontSize: 10,
            },
            {
                text: '{{tchoHdlRValue}}',
                x: 240,
                y: 340,
                fontSize: 10,
                placeholder: 'tchoHdlRValue'
            },
            {
                text: '{{tchoHdlRValueFlag}}',
                x: 365,
                y: 340,
                fontSize: 10,
                placeholder: 'tchoHdlRValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 14, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 340,
                fontSize: 10,
            },
        ]
    };

    return lipidProfileTemplate;
}