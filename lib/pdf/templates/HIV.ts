import { ReportTemplate } from '@/types/pdf';

export function getHIVTemplate() {
    const hivTemplate: ReportTemplate = {
        id: 'hiv-report',
        name: 'H.I.V. Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            // hivAntigen
            {
                text: 'H.I.V. ANTIGEN',
                x: 60,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{hivAntigen}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'hivAntigen'
            },

            // hivAntibody
            {
                text: 'H.I.V. ANTIBODY',
                x: 60,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{hivAntibody}}',
                x: 240,
                y: 260,
                fontSize: 10,
                placeholder: 'hivAntibody'
            },
        ]
    };

    return hivTemplate;
}