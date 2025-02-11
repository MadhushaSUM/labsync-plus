import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getSBilirubinTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {
    const sBilirubinTemplate: ReportTemplate = {
        id: 'sbilirubin-report',
        name: 'Serum Bilirubin Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            // Total Bilirubin
            {
                text: 'TOTAL BILIRUBIN',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{totalBilirubinValue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'totalBilirubinValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{totalBilirubinValueFlag}}',
                x: 365,
                y: 240,
                fontSize: 10,
                placeholder: 'totalBilirubinValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 65, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 240,
                fontSize: 10,
            },

            // Direct Bilirubin
            {
                text: 'DIRECT BILIRUBIN',
                x: 50,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{directBilirubinValue}}',
                x: 240,
                y: 260,
                fontSize: 10,
                placeholder: 'directBilirubinValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{directBilirubinValueFlag}}',
                x: 365,
                y: 260,
                fontSize: 10,
                placeholder: 'directBilirubinValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 66, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 260,
                fontSize: 10,
            },

            // Indirect Bilirubin
            {
                text: 'INDIRECT BILIRUBIN',
                x: 50,
                y: 280,
                fontSize: 10,
            },
            {
                text: '{{indirectBilirubinValue}}',
                x: 240,
                y: 280,
                fontSize: 10,
                placeholder: 'indirectBilirubinValue'
            },
            {
                text: 'mg/dl',
                x: 305,
                y: 280,
                fontSize: 10,
            },
            {
                text: '{{indirectBilirubinValueFlag}}',
                x: 365,
                y: 280,
                fontSize: 10,
                placeholder: 'indirectBilirubinValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 67, patientDateOfBirth, patientGender, 'mg/dl'),
                x: 430,
                y: 280,
                fontSize: 10,
            },
        ]
    };

    return sBilirubinTemplate;
}