import { ReportTemplate } from '@/types/pdf';

export function getCardiacTroponinTTemplate() {
    const cardiacTroponinTTemplate: ReportTemplate = {
        id: 'cardiactroponint-report',
        name: 'Cardiac Troponin T Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'cTnT',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{ctnt}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'ctnt'
            },
        ]
    };

    return cardiacTroponinTTemplate;
}