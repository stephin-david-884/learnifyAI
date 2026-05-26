import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { ITextChunkingService, TextChunk } from "../../../application/interfaces/services/document/ITextChunkingService";
import { ParsedPdfPage } from "../../../application/interfaces/services/document/IPdfParserService";

export class TextChunkingService implements ITextChunkingService {

    private readonly _splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    async splitText(pages: ParsedPdfPage[]): Promise<TextChunk[]> {
        
        const chunks: TextChunk[] = [];

        let chunkIndex = 0;

        for(const page of pages) {
            const docs = await this._splitter.createDocuments([
                page.text
            ]);

            for( const doc of docs ) {
                chunks.push({
                    content: doc.pageContent,
                    chunkIndex,
                    pageNumber: page.pageNumber
                });

                chunkIndex++;
            }    
        }

        return chunks;
    }
}