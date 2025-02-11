import { ReportTemplate } from '@/types/pdf';

export function getDengueTestTemplate() {
    const dengueTestTemplate: ReportTemplate = {
        id: 'denguetest-report',
        name: 'Dengue Test Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'TEST FOR DENGUE ANTIGEN',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{dengue}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'dengue'
            },
        ]
    };

    return dengueTestTemplate;
}