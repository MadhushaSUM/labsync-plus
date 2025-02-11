import { ReportTemplate } from '@/types/pdf';

export function getSFRTemplate() {
    const sfrTemplate: ReportTemplate = {
        id: 'sfr-report',
        name: 'Stool Full Report',
        extends: 'base-template',
        pageSize: { width: 595, height: 842 },
        elements: [
            // Color
            {
                text: 'COLOUR',
                x: 60,
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
                x: 60,
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

            // reducingSubs
            {
                text: 'REDUCING SUBSTANCES (SUGAR)',
                x: 60,
                y: 280,
                fontSize: 10,
            },
            {
                text: '{{reducingSubs}}',
                x: 240,
                y: 280,
                fontSize: 10,
                placeholder: 'reducingSubs'
            },

            // AOC
            {
                text: 'AOC',
                x: 60,
                y: 300,
                fontSize: 10,
            },
            {
                text: '{{aoc}}',
                x: 240,
                y: 300,
                fontSize: 10,
                placeholder: 'aoc'
            },
            
            {
                text: 'DEPOSITS (PER H.P.F.)',
                x: 50,
                y: 320,
                fontSize: 10,
                fontWeight: 'bold'
            },

            // redCells
            {
                text: 'RED CELLS',
                x: 60,
                y: 340,
                fontSize: 10,
            },
            {
                text: '{{redCells}}',
                x: 240,
                y: 340,
                fontSize: 10,
                placeholder: 'redCells'
            },

            // pusCells
            {
                text: 'PUS CELLS',
                x: 60,
                y: 360,
                fontSize: 10,
            },
            {
                text: '{{pusCells}}',
                x: 240,
                y: 360,
                fontSize: 10,
                placeholder: 'pusCells'
            },

            // epithelialCells
            {
                text: 'EPITHELIAL CELLS',
                x: 60,
                y: 380,
                fontSize: 10,
            },
            {
                text: '{{epithelialCells}}',
                x: 240,
                y: 380,
                fontSize: 10,
                placeholder: 'epithelialCells'
            },

            // FAT GLOBULES
            {
                text: 'FAT GLOBULES',
                x: 60,
                y: 400,
                fontSize: 10,
            },
            {
                text: '{{fatGlobules}}',
                x: 240,
                y: 400,
                fontSize: 10,
                placeholder: 'fatGlobules'
            },

            // MUCUS
            {
                text: 'MUCUS',
                x: 60,
                y: 420,
                fontSize: 10,
            },
            {
                text: '{{mucus}}',
                x: 240,
                y: 420,
                fontSize: 10,
                placeholder: 'mucus'
            },

            // VEG. FIBROUS
            {
                text: 'VEG. FIBROUS',
                x: 60,
                y: 440,
                fontSize: 10,
            },
            {
                text: '{{vegFibrous}}',
                x: 240,
                y: 440,
                fontSize: 10,
                placeholder: 'vegFibrous'
            },

            // YEAST
            {
                text: 'YEAST',
                x: 60,
                y: 460,
                fontSize: 10,
            },
            {
                text: '{{yeast}}',
                x: 240,
                y: 460,
                fontSize: 10,
                placeholder: 'yeast'
            },
        ]
    };

    return sfrTemplate;
}