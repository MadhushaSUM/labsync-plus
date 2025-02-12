import { ReportTemplate } from "@/types/pdf";

export function getBaseTemplate(isExport: boolean) {
    const baseTemplate: ReportTemplate = {
        id: 'base-template',
        name: 'Base Template',
        pageSize: { width: 595, height: 842 },
        elements: [
            {
                text: "PT'S NAME",
                x: 40,
                y: 115,
                fontSize: 10,
            },
            {
                text: 'REF. NO.',
                x: 400,
                y: 115,
                fontSize: 10,
            },
            {
                text: 'SEX',
                x: 40,
                y: 140,
                fontSize: 10,
            }, {
                text: 'AGE',
                x: 220,
                y: 140,
                fontSize: 10,
            },
            {
                text: 'DATE',
                x: 400,
                y: 140,
                fontSize: 10,
            },
            {
                text: 'TEST(S)',
                x: 40,
                y: 165,
                fontSize: 10,
            },
            {
                text: 'REFERRED BY',
                x: 40,
                y: 190,
                fontSize: 10,
            },
            {
                text: ": {{patientName}}",
                x: 115,
                y: 115,
                fontSize: 10,
                fontWeight: 'bold',
                placeholder: 'patientName'
            },
            {
                text: ': {{ref_number}}',
                x: 450,
                y: 115,
                fontSize: 10,
                fontWeight: 'bold',
                placeholder: 'ref_number'
            },
            {
                text: ': {{patientGender}}',
                x: 115,
                y: 140,
                fontSize: 10,
                fontWeight: 'bold',
                placeholder: 'patientGender'
            }, {
                text: ': {{patientAge}}',
                x: 250,
                y: 140,
                fontSize: 10,
                fontWeight: 'bold',
                placeholder: 'patientAge'
            },
            {
                text: ': {{date}}',
                x: 450,
                y: 140,
                fontSize: 10,
                fontWeight: 'bold',
                placeholder: 'date'
            },
            {
                text: ': {{testName}}',
                x: 115,
                y: 165,
                fontSize: 10,
                fontWeight: 'bold',
                placeholder: 'testName'
            },
            {
                text: ': {{doctorName}}',
                x: 115,
                y: 190,
                fontSize: 10,
                fontWeight: 'bold',
                placeholder: 'doctorName'
            },
            {
                startX: 20,
                startY: 202,
                endX: 575,
                endY: 202,
                lineWidth: 1
            },
            {
                startX: 20,
                startY: 222,
                endX: 575,
                endY: 222,
                lineWidth: 1
            },
            {
                text: 'TEST',
                x: 50,
                y: 215,
                fontSize: 10,
                fontWeight: 'bold'
            },
            {
                text: 'RESULT',
                x: 235,
                y: 215,
                fontSize: 10,
                fontWeight: 'bold'
            },
            {
                text: 'UNIT',
                x: 305,
                y: 215,
                fontSize: 10,
                fontWeight: 'bold'
            },
            {
                text: 'FLAG',
                x: 365,
                y: 215,
                fontSize: 10,
                fontWeight: 'bold'
            },
            {
                text: 'REF. RANGE',
                x: 430,
                y: 215,
                fontSize: 10,
                fontWeight: 'bold'
            }
        ]
    }

    if (isExport) {
        baseTemplate.elements.push(
            {
                src: '/header.png',
                x: 0,
                y: 0,
                width: 595,
                height: 100
            },
            {
                src: '/footer.png',
                x: 0,
                y: 820,
                width: 595,
                height: 25
            }
        );
    }

    return baseTemplate;
}