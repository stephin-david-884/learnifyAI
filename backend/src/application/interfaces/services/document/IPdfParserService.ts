export type ParsedPdfPage = {
    pageNumber: number;
    text: string;

    hasImages: boolean;
    imageCount: number;
};

export type ParsedPdfResult = {
    pages: ParsedPdfPage[];
    totalPages: number;
};

export interface IPdfParserService {
    parse(buffer: Buffer): Promise<ParsedPdfResult>;
}