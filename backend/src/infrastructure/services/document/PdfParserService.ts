// import * as pdfParse from "pdf-parse";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { IPdfParserService, ParsedPdfPage, ParsedPdfResult } from "../../../application/interfaces/services/document/IPdfParserService";
import { TextItem } from "pdfjs-dist/types/src/display/api";

// export class PdfParserService implements IPdfParserService {

//     async parse(buffer: Buffer): Promise<ParsedPdfResult> {
        
//         const result = await (pdfParse as any)(buffer);

//         return {
//             text: result.text,
//             totalPages: result.numpages
//         }
//     }
// }

export class PdfParserService implements IPdfParserService {

    async parse( buffer: Buffer): Promise<ParsedPdfResult> {

        const pdf = await pdfjsLib.getDocument({
            data: new Uint8Array(buffer),
        }).promise;

        const pages: ParsedPdfPage[] = [];

        for(let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++){

            const page = await pdf.getPage(pageNumber);

            const textContent = await page.getTextContent();

            // const text = textContent.items.map((item: any) => item.str).join(" ");
            const text =
                textContent.items
                    .filter((item): item is TextItem =>"str" in item)
                    .map((item) => item.str)
                    .join(" ");

            pages.push({
                pageNumber,
                text
            })
        }

        return {
            pages,
            totalPages: pdf.numPages
        }
    }
}