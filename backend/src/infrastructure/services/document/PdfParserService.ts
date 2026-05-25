import * as pdfParse from "pdf-parse";
import { IPdfParserService, ParsedPdfResult } from "../../../application/interfaces/services/document/IPdfParserService";

export class PdfParserService implements IPdfParserService {

    async parse(buffer: Buffer): Promise<ParsedPdfResult> {
        
        const result = await (pdfParse as any)(buffer);

        return {
            text: result.text,
            totalPages: result.numpages
        }
    }
}