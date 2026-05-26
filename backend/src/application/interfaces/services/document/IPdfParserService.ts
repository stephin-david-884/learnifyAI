export type ParsedPdfPage = {
    pageNumber: number;
    text: string;
};

export type ParsedPdfResult = {
    pages: ParsedPdfPage[];
    totalPages: number;
};

export interface IPdfParserService {
    parse(buffer: Buffer): Promise<ParsedPdfResult>;
}