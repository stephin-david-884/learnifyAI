import { pdf } from "pdf-to-img"; // Stream directly to avoid O(N^2) overhead
import { IImageAnalysisService } from "../../../application/interfaces/services/ai/IImageAnalysisService";
import { ParsedPdfPage } from "../../../application/interfaces/services/document/IPdfParserService";
import { IVisualContentExtractionService, VisualChunk } from "../../../application/interfaces/services/document/IVisualContentExtractionService ";
import { logger } from "../log/logger";
import { IPageImageRendererService } from "../../../application/interfaces/services/document/IPageImageRendererService";

export class VisualContentExtractionService implements IVisualContentExtractionService {
    
    constructor(
        private readonly renderer: IPageImageRendererService, // Kept for interface compatibility
        private readonly vision: IImageAnalysisService
    ) {}

    async extract(pdfBuffer: Buffer, pages: ParsedPdfPage[]): Promise<VisualChunk[]> {
        const visualChunks: VisualChunk[] = [];
        
        // Map target page numbers that actually contain images for quick lookup
        const pagesToAnalyze = new Set(
            pages.filter(page => page.hasImages).map(page => page.pageNumber)
        );

        if (pagesToAnalyze.size === 0) return [];

        logger.info(`Starting single-pass visual rendering for ${pagesToAnalyze.size} pages...`);

        // Initialize the single-pass document stream
        const documentStream = await pdf(pdfBuffer, { scale: 2 });
        let currentPageNumber = 1;
        let consecutiveFailures = 0;

        for await (const imageBuffer of documentStream) {
            if (pagesToAnalyze.has(currentPageNumber)) {
                logger.info(`Analyzing visual layout on Page ${currentPageNumber}...`);
                
                try {
                    const description = await this.vision.analyzePageImage(imageBuffer);
                    
                    if (description) {
                        visualChunks.push({
                            pageNumber: currentPageNumber,
                            content: description
                        });
                    }
                    consecutiveFailures = 0; // Reset on success
                } catch (error: unknown) {
                    consecutiveFailures++;
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    logger.error(`Failed to analyze visual layout on Page ${currentPageNumber}: ${errorMessage}`);
                    
                    if (consecutiveFailures >= 3) {
                        logger.info(`Aborting visual extraction for the remaining pages due to 3 consecutive failures (Quota exhausted/API unavailable).`);
                        break;
                    }
                }
            }
            currentPageNumber++;
        }

        return visualChunks;
    }
}