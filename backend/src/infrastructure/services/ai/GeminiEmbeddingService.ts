import { GoogleGenerativeAIEmbeddings }
from "@langchain/google-genai";

import { IEmbeddingService }
from "../../../application/interfaces/services/ai/IEmbeddingService";
import { logger } from "../log/logger";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class GoogleEmbeddingService
implements IEmbeddingService {

    private readonly _embeddings;

    constructor() {

        this._embeddings =
            new GoogleGenerativeAIEmbeddings({
                apiKey:
                    process.env.GEMINI_API_KEY!,

                model: "gemini-embedding-001",
                
            });
    }

    async generateEmbedding(
        text: string
    ): Promise<number[]> {

        const embedding = await this._embeddings.embedQuery(text);

        if (!embedding || !Array.isArray(embedding) || embedding.length === 0) {
            throw new Error("Failed to generate embedding: Result is empty or malformed");
        }

        return embedding;
    }

    async generateEmbeddings(texts: string[]): Promise<number[][]> {
        if (!texts || texts.length === 0) return [];

        const batchSize = 50; 
        const allEmbeddings: number[][] = [];

        for (let i = 0; i < texts.length; i += batchSize) {
            const batch = texts.slice(i, i + batchSize);
            
            let batchResults: number[][] = [];
            let attempts = 0;
            let success = false;

            while (attempts < 3 && !success) {
                try {
                    batchResults = await this._embeddings.embedDocuments(batch);

                    const isRateLimited = !batchResults || batchResults.length === 0 || batchResults.every(arr => !arr || arr.length === 0);

                    if (!isRateLimited) {
                        success = true;
                    } else {
                        attempts++;
                        // Attempt 1: Wait 30s | Attempt 2: Wait 60s to let the 1-minute rolling token window clear
                        const backoffDelay = attempts === 1 ? 30000 : 60000;
                        logger.info(`[Quota Hit] Gemini TPM/RPM limit reached at chunk index ${i}. Waiting ${backoffDelay / 1000}s to retry (Attempt ${attempts}/3)...`);
                        await delay(backoffDelay); 
                    }
                } catch (error) {
                    attempts++;
                    const backoffDelay = attempts === 1 ? 30000 : 60000;
                    logger.error(`[API Error] Error during embedding generation at chunk index ${i}: ${error instanceof Error ? error.message : error}. Retrying in ${backoffDelay / 1000}s...`);
                    await delay(backoffDelay);
                }
            }


            if (!success) {
                throw new Error(`Failed to generate embeddings for batch starting at index ${i} after ${attempts} attempts due to persistent rate limits.`);
            }

            // if (!success) {
            //     logger.info(`Failed to fetch valid embeddings for batch starting at ${i} after 3 attempts.`);
            // }

            allEmbeddings.push(...batchResults);

            if (i + batchSize < texts.length) {
                await delay(3000);
            }
        }

        if (allEmbeddings.length !== texts.length) {
            throw new Error(
                `Embedding mismatch anomaly: Input texts length is ${texts.length} but generated ${allEmbeddings.length} vectors.`
            );
        }

        return allEmbeddings;
    }
}