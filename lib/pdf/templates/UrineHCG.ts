import { ReportTemplate } from '@/types/pdf';

export function getUrineHCGTemplate() {
    const urineHCGTemplate: ReportTemplate = {
        id: 'urinehcg-report',
        name: 'Urine H.C.G. Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'H.C.G.',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{hcg}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'hcg'
            },
        ]
    };

    return urineHCGTemplate;
}