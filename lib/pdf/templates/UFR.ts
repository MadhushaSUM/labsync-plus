import { ReportTemplate } from '@/types/pdf';

export function getUFRTemplate() {
    const ufrTemplate: ReportTemplate = {
        id: 'ufr-report',
        name: 'Urine Full Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            // Color
            {
                text: 'COLOUR',
                x: 50,
                y: 240,
                fontSize: 10,
            },
            {
                text: '{{colour}}',
                x: 240,
                y: 240,
                fontSize: 10,
                placeholder: 'colour'
            },

            // Appearance
            {
                text: 'APPEARANCE',
                x: 50,
                y: 260,
                fontSize: 10,
            },
            {
                text: '{{appearance}}',
                x: 240,
                y: 260,
                fontSize: 10,
                placeholder: 'appearance'
            },

            // Reaction
            {
                text: 'REACTION',
                x: 50,
                y: 280,
                fontSize: 10,
            },
            {
                text: '{{reaction}}',
                x: 240,
                y: 280,
                fontSize: 10,
                placeholder: 'reaction'
            },

            // Albumin
            {
                text: 'ALBUMIN',
                x: 50,
                y: 300,
                fontSize: 10,
            },
            {
                text: '{{albumin}}',
                x: 240,
                y: 300,
                fontSize: 10,
                placeholder: 'albumin'
            },

            // Reducing Substances
            {
                text: 'REDUCING SUBSTANCES',
                x: 50,
                y: 320,
                fontSize: 10,
            },
            {
                text: '{{reducingSubs}}',
                x: 240,
                y: 320,
                fontSize: 10,
                placeholder: 'reducingSubs'
            },

            // Bile
            {
                text: 'BILE',
                x: 50,
                y: 340,
                fontSize: 10,
            },
            {
                text: '{{bile}}',
                x: 240,
                y: 340,
                fontSize: 10,
                placeholder: 'bile'
            },

            // Urobilinogen
            {
                text: 'UROBILINOGEN',
                x: 50,
                y: 360,
                fontSize: 10,
            },
            {
                text: '{{urobilinogen}}',
                x: 240,
                y: 360,
                fontSize: 10,
                placeholder: 'urobilinogen'
            },

            // Pus Cells
            {
                text: 'PUS CELLS',
                x: 50,
                y: 380,
                fontSize: 10,
            },
            {
                text: '{{pusCells}}',
                x: 240,
                y: 380,
                fontSize: 10,
                placeholder: 'pusCells'
            },

            // Red Cells
            {
                text: 'RED CELLS',
                x: 50,
                y: 400,
                fontSize: 10,
            },
            {
                text: '{{redCells}}',
                x: 240,
                y: 400,
                fontSize: 10,
                placeholder: 'redCells'
            },

            // Epithelial Cells
            {
                text: 'EPITHELIAL CELLS',
                x: 50,
                y: 420,
                fontSize: 10,
            },
            {
                text: '{{epithelialCells}}',
                x: 240,
                y: 420,
                fontSize: 10,
                placeholder: 'epithelialCells'
            },

            // Casts
            {
                text: 'CASTS',
                x: 50,
                y: 440,
                fontSize: 10,
            },
            {
                text: '{{casts}}',
                x: 240,
                y: 440,
                fontSize: 10,
                placeholder: 'casts'
            },

            // Crystals
            {
                text: 'CRYSTALS',
                x: 50,
                y: 460,
                fontSize: 10,
            },
            {
                text: '{{crystals}}',
                x: 240,
                y: 460,
                fontSize: 10,
                placeholder: 'crystals'
            },

            // Organisms
            {
                text: 'ORGANISMS',
                x: 50,
                y: 480,
                fontSize: 10,
            },
            {
                text: '{{organisms}}',
                x: 240,
                y: 480,
                fontSize: 10,
                placeholder: 'organisms'
            },
        ]
    };

    return ufrTemplate;
}