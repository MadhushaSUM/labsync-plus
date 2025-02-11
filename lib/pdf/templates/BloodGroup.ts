import { ReportTemplate } from '@/types/pdf';

export function getBloodGroupTemplate() {
    const bloodGroupTemplate: ReportTemplate = {
        id: 'bloodgroup-report',
        name: 'Blood Group Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: 'BLOOD GROUP',
                x: 60,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{bloodGroup}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'bloodGroup'
            },
        ]
    };

    return bloodGroupTemplate;
}