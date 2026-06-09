import {pdf} from "pdf-to-img";
import { IPageImageRendererService } from "../../../application/interfaces/services/document/IPageImageRendererService";

export class PdfPageImageRendererService implements IPageImageRendererService {

    async renderPage(pdfBuffer: Buffer, pageNumber: number): Promise<Buffer> {
        
        const document = await pdf(pdfBuffer, {scale: 2});

        let currentpage = 1;

        for await (
            const image of document
        ) {
            if(currentpage === pageNumber) {
                return image;
            }
            currentpage++;
        }

        throw new Error(`Page ${pageNumber} not found`)
    }
}