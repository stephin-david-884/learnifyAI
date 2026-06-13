import { GoogleGenerativeAI } from "@google/generative-ai";
import { IImageAnalysisService } from "../../../application/interfaces/services/ai/IImageAnalysisService";
import { logger } from "../log/logger";

export class GeminiVisionService implements IImageAnalysisService {
    private readonly _model;

    constructor() {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        this._model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    }

    
    private async executeWithRetry<T>(fn: () => Promise<T>, retries = 3, delay = 2000): Promise<T> {
        try {
            return await fn();
        } catch (error: unknown) {
            
            const status = (error as { status?: number })?.status;
            const message = error instanceof Error ? error.message : String(error);
            const isTransientError = status === 503 || status === 429 || message.includes("503") || message.includes("429");
            
            if (isTransientError && retries > 0) {
                const backoffDelay = status === 429 ? Math.max(delay, 30000) : delay; // Wait longer for 429 Too Many Requests
                logger.info(`Gemini API busy (Status: ${status}). Retrying in ${backoffDelay}ms... (${retries} attempts left)`);
                await new Promise((resolve) => setTimeout(resolve, backoffDelay));
                return this.executeWithRetry(fn, retries - 1, backoffDelay * 2); // Double the wait time next time
            }
            throw error; 
        }
    }

    async analyzePageImage(imageBuffer: Buffer): Promise<string | null> {
        const prompt = `
            You are analyzing a page from an educational PDF.
            Your task is to extract educational visual information.
            Include: Architecture diagrams, UML diagrams, ER diagrams, Flowcharts, Charts, Graphs, Technical illustrations, Tables.
            Ignore: Logos, Decorative images, Watermarks, Profile photos.
            Return a structured textual description suitable for semantic search.
            If no meaningful educational visual content exists, return exactly: NO_RELEVANT_VISUAL_CONTENT
        `;

        
        const result = await this.executeWithRetry(() => 
            this._model.generateContent([
                prompt,
                {
                    inlineData: {
                        data: imageBuffer.toString("base64"),
                        mimeType: "image/png",
                    },
                },
            ])
        );

        const response = result.response.text().trim();

        if (response.includes("NO_RELEVANT_VISUAL_CONTENT")) {
            return null;
        }

        
        await new Promise((resolve) => setTimeout(resolve, 4000));

        return response;
    }
}