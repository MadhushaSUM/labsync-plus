import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getESRTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {
    const hbTemplate: ReportTemplate = {
        id: 'esr-report',
        name: 'ESR Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'ESR (1st hour)',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{esr1sthrValue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'esr1sthrValue'
            },
            {
                text: 'mm/hr',
                x: 305,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{esr1sthrValueFlag}}',
                x: 365,
                y: 240,
                fontSize: 10,
                placeholder: 'esr1sthrValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 34, patientDateOfBirth, patientGender, 'mm/hr'),
                x: 430,
                y: 240,
                fontSize: 10,
            },
        ]
    };

    return hbTemplate;
}