import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getOTPTTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {
    const otptTemplate: ReportTemplate = {
        id: 'otpt-report',
        name: 'OTPT Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'SGOT (AST)',
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
                text: 'u/L',
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
                text: findTheCorrectNormalRangeRule(normalRanges, 36, patientDateOfBirth, patientGender, 'u/L'),
                x: 430,
                y: 240,
                fontSize: 10,
            },
            {
                text: 'SGPT (ALT)',
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
                text: 'u/L',
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
                text: findTheCorrectNormalRangeRule(normalRanges, 37, patientDateOfBirth, patientGender, 'u/L'),
                x: 430,
                y: 260,
                fontSize: 10,
            },
        ]
    };

    return otptTemplate;
}