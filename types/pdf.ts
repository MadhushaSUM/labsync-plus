export interface TextElement {
    text: string;
    x: number;
    y: number;
    font?: string;
    fontSize?: number;
    fontWeight?: string;
    align?: 'left' | 'center' | 'right';
    placeholder?: string;
  }
  
  export interface LineElement {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    lineWidth?: number;
    color?: string;
  }
  
  export interface ImageElement {
    src: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }
  
  export type ReportElement = TextElement | LineElement | ImageElement;
  
  export interface ReportTemplate {
    id: string;
    name: string;
    pageSize: {
      width: number;
      height: number;
    };
    elements: ReportElement[];
    extends?: string;
  }