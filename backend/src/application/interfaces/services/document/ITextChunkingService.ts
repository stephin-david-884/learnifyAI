import { ParsedPdfPage } from "./IPdfParserService";

export type TextChunk = {
    content: string;
    chunkIndex: number;
    pageNumber: number;
};

export interface ITextChunkingService {

    splitText( pages: ParsedPdfPage[]): Promise<TextChunk[]>;
}