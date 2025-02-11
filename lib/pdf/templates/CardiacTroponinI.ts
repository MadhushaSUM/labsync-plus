import { ReportTemplate } from '@/types/pdf';

export function getCardiacTroponinITemplate() {
    const cardiacTroponinITemplate: ReportTemplate = {
        id: 'cardiactroponini-report',
        name: 'Cardiac Troponin I Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'cTnI',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{ctni}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'ctni'
            },
        ]
    };

    return cardiacTroponinITemplate;
}