export type ParsedPdfResult = {
    text: string;
    totalPages: number;
};

export interface IPdfParserService {
    parse(buffer: Buffer): Promise<ParsedPdfResult>;
}