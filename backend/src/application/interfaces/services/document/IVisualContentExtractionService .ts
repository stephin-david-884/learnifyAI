import { ParsedPdfPage } from "./IPdfParserService";

export type VisualChunk = {
    content: string;
    pageNumber: number;
}

export interface IVisualContentExtractionService {

    extract(pdfBuffer: Buffer, pages: ParsedPdfPage[]): Promise<VisualChunk[]>;
}