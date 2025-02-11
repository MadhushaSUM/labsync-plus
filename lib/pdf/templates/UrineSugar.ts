import { ReportTemplate } from '@/types/pdf';

export function getUrineSugarTemplate() {
    const urineSugarTemplate: ReportTemplate = {
        id: 'urinesugar-report',
        name: 'Urine Sugar Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'URINE SUGAR/ REDUCING SUBS.',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{urineSugar}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'urineSugar'
            },
        ]
    };

    return urineSugarTemplate;
}