import jsPDF from 'jspdf';
import { ReportTemplate, TextElement, LineElement, ImageElement, ReportElement } from '@/types/pdf';
import { getBaseTemplate } from './templates/baseTemplate';

export class PDFGenerator {
    private doc: jsPDF;
    private templates: Map<string, ReportTemplate>;

    constructor(pageSize: { width: number; height: number }, isExport: boolean) {
        this.doc = new jsPDF({
            unit: 'pt',
            format: [pageSize.width, pageSize.height],
        });
        this.templates = new Map();
        this.templates.set('base-template', getBaseTemplate(isExport));
    }

    private replaceePlaceholders(text: string, data: any): string {
        return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return data[key] || '';
        });
    }

    private async drawElement(element: TextElement | LineElement | ImageElement, data: any) {
        if (this.isTextElement(element)) {
            const processedElement = { ...element };
            if (element.placeholder) {
                processedElement.text = this.replaceePlaceholders(element.text, data);
            }
            this.drawText(processedElement);
        } else if (this.isLineElement(element)) {
            this.drawLine(element);
        } else if (this.isImageElement(element)) {
            await this.drawImage(element);
        }
    }

    private isTextElement(element: any): element is TextElement {
        return 'text' in element;
    }

    private isLineElement(element: any): element is LineElement {
        return 'startX' in element && 'endX' in element;
    }

    private isImageElement(element: any): element is ImageElement {
        return 'src' in element && 'width' in element;
    }

    private drawText(element: TextElement) {
        const { text, x, y, font = 'courier', fontSize = 12, align = 'left', fontWeight } = element;
        this.doc.setFont(font, fontWeight || 'normal');
        this.doc.setFontSize(fontSize);
        this.doc.text(text, x, y, { align });
    }

    private drawLine(element: LineElement) {
        const { startX, startY, endX, endY, lineWidth = 1, color = '#000000' } = element;
        this.doc.setLineWidth(lineWidth);
        this.doc.setDrawColor(color);
        this.doc.line(startX, startY, endX, endY);
    }

    private async drawImage(element: ImageElement) {
        const { src, x, y, width, height } = element;
        const img = await this.loadImage(src);
        this.doc.addImage(img, 'JPEG', x, y, width, height);
    }

    private loadImage(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    private getMergedTemplate(template: ReportTemplate): ReportElement[] {
        let elements: ReportElement[] = [];

        // If template extends another template, get parent elements first
        if (template.extends) {
            const parentTemplate = this.templates.get(template.extends);
            if (parentTemplate) {
                elements = [...this.getMergedTemplate(parentTemplate)];
            }
        }

        // Add current template elements
        elements = [...elements, ...template.elements];

        return elements;
    }

    public async generatePDF(template: ReportTemplate, data: any) {
        // Register the template
        this.templates.set(template.id, template);

        // Get merged elements from base and current template
        const elements = this.getMergedTemplate(template);

        // Draw all elements
        for (const element of elements) {
            await this.drawElement(element, data);
        }

        return this.doc;
    }

    public download(filename: string) {
        this.doc.save(filename);
    }

    public async print(): Promise<void> {
        try {
            const pdfOutput = this.doc.output('blob');
            const blobUrl = URL.createObjectURL(pdfOutput);

            const printFrame = document.createElement('iframe');
            printFrame.style.display = 'none';
            document.body.appendChild(printFrame);

            await new Promise((resolve) => {
                printFrame.onload = resolve;
                printFrame.src = blobUrl;
            });

            const frameWindow = printFrame.contentWindow;
            if (!frameWindow) {
                throw new Error('Could not access print frame window');
            }

            frameWindow.print();

            setTimeout(() => {
                document.body.removeChild(printFrame);
                URL.revokeObjectURL(blobUrl);
            }, 1000);

        } catch (error) {
            console.error('Error printing PDF:', error);
            throw new Error(`Failed to print PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}