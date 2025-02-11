import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getCRPTemplate(patientDateOfBirth: Date, patientGender: string, isPostive: boolean, normalRanges?: NormalRange[]) {
    const crpTemplate: ReportTemplate = {
        id: 'crp-report',
        name: 'CRP Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'CRP',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{crp}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'crp'
            },
        ]
    };

    if (isPostive) {
        crpTemplate.elements.push(
            {
                text: 'TITRE',
                x: 50,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{crpTitreValue}}',
                x: 240,
                y: 260,
                fontSize: 10,
                placeholder: 'crpTitreValue'
            },
            {
                text: 'mg/L',
                x: 305,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{crpTitreValueFlag}}',
                x: 365,
                y: 260,
                fontSize: 10,
                placeholder: 'crpTitreValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 35, patientDateOfBirth, patientGender, 'mg/L'),
                x: 430,
                y: 260,
                fontSize: 10,
            },
        );
    }

    return crpTemplate;
}