import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getRhFactorTemplate(patientDateOfBirth: Date, patientGender: string, isPostive: boolean, normalRanges?: NormalRange[]) {
    const rhFactorTemplate: ReportTemplate = {
        id: 'RhFactor-report',
        name: 'Rh. Factor Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'RF',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{rhFactor}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'rhFactor'
            },
        ]
    };

    if (isPostive) {
        rhFactorTemplate.elements.push(
            {
                text: 'TITRE',
                x: 50,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{rhFactorTitreValue}}',
                x: 240,
                y: 260,
                fontSize: 10,
                placeholder: 'rhFactorTitreValue'
            },
            {
                text: 'Iu/ml',
                x: 305,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{rhFactorTitreValueFlag}}',
                x: 365,
                y: 260,
                fontSize: 10,
                placeholder: 'rhFactorTitreValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 48, patientDateOfBirth, patientGender, 'Iu/ml'),
                x: 430,
                y: 260,
                fontSize: 10,
            },
        );
    }

    return rhFactorTemplate;
}