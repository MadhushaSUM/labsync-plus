import { findTheCorrectNormalRangeRule } from '@/lib/normalRangeFlag';
import { NormalRange } from '@/types/entity/investigation';
import { ReportTemplate } from '@/types/pdf';

export function getWBCDCTemplate(patientDateOfBirth: Date, patientGender: string, normalRanges?: NormalRange[]) {
    const WBCDCTemplate: ReportTemplate = {
        id: 'wbcdc-report',
        name: 'WBCDC Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            // Differential Count Header
            {
                text: 'DIFFERENTIAL COUNT',
                x: 50,
                y: 240,
                fontSize: 10,
                fontWeight: 'bold'
            },

            // Neutrophils
            {
                text: 'NEUTROPHILS',
                x: 60,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{neutrophilsValue}}',
                x: 240,
                y: 260,
                fontSize: 10,
                placeholder: 'neutrophilsValue'
            },
            {
                text: '%',
                x: 305,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{neutrophilsValueFlag}}',
                x: 365,
                y: 260,
                fontSize: 10,
                placeholder: 'neutrophilsValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 28, patientDateOfBirth, patientGender, '%'),
                x: 430,
                y: 260,
                fontSize: 10,
            },

            // Lymphocytes
            {
                text: 'LYMPHOCYTES',
                x: 60,
                y: 280,
                fontSize: 10,
            },
            {
                text: '{{lymphocytesValue}}',
                x: 240,
                y: 280,
                fontSize: 10,
                placeholder: 'lymphocytesValue'
            },
            {
                text: '%',
                x: 305,
                y: 280,
                fontSize: 10,
            },
            {
                text: '{{lymphocytesValueFlag}}',
                x: 365,
                y: 280,
                fontSize: 10,
                placeholder: 'lymphocytesValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 29, patientDateOfBirth, patientGender, '%'),
                x: 430,
                y: 280,
                fontSize: 10,
            },

            // Eosinophils
            {
                text: 'EOSINOPHILS',
                x: 60,
                y: 300,
                fontSize: 10,
            },
            {
                text: '{{eosinophilsValue}}',
                x: 240,
                y: 300,
                fontSize: 10,
                placeholder: 'eosinophilsValue'
            },
            {
                text: '%',
                x: 305,
                y: 300,
                fontSize: 10,
            },
            {
                text: '{{eosinophilsValueFlag}}',
                x: 365,
                y: 300,
                fontSize: 10,
                placeholder: 'eosinophilsValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 30, patientDateOfBirth, patientGender, '%'),
                x: 430,
                y: 300,
                fontSize: 10,
            },

            // Monocytes
            {
                text: 'MONOCYTES',
                x: 60,
                y: 320,
                fontSize: 10,
            },
            {
                text: '{{monocytesValue}}',
                x: 240,
                y: 320,
                fontSize: 10,
                placeholder: 'monocytesValue'
            },
            {
                text: '%',
                x: 305,
                y: 320,
                fontSize: 10,
            },
            {
                text: '{{monocytesValueFlag}}',
                x: 365,
                y: 320,
                fontSize: 10,
                placeholder: 'monocytesValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 31, patientDateOfBirth, patientGender, '%'),
                x: 430,
                y: 320,
                fontSize: 10,
            },

            // Basophils
            {
                text: 'BASOPHILS',
                x: 60,
                y: 340,
                fontSize: 10,
            },
            {
                text: '{{basophilsValue}}',
                x: 240,
                y: 340,
                fontSize: 10,
                placeholder: 'basophilsValue'
            },
            {
                text: '%',
                x: 305,
                y: 340,
                fontSize: 10,
            },
            {
                text: '{{basophilsValueFlag}}',
                x: 365,
                y: 340,
                fontSize: 10,
                placeholder: 'basophilsValueFlag'
            },
            {
                text: findTheCorrectNormalRangeRule(normalRanges, 32, patientDateOfBirth, patientGender, '%'),
                x: 430,
                y: 340,
                fontSize: 10,
            },
        ]
    };

    return WBCDCTemplate;
}