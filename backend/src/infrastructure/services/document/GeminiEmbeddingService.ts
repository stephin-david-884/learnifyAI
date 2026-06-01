import { GoogleGenerativeAIEmbeddings }
from "@langchain/google-genai";

import { IEmbeddingService }
from "../../../application/interfaces/services/document/IEmbeddingService";

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

    // async generateEmbeddings(
    //     texts: string[]
    // ): Promise<number[][]> {

    //     const embeddings = await this._embeddings.embedDocuments(texts);

    //     if (!embeddings || !Array.isArray(embeddings) || embeddings.length !== texts.length) {
    //         throw new Error("Failed to generate bulk embeddings accurately.");
    //     }

    //     return embeddings;
    // }

    async generateEmbeddings(texts: string[]): Promise<number[][]> {
        if (!texts || texts.length === 0) return [];

        // 50 is the optimal safe zone for Google's free tier token limits
        const batchSize = 50; 
        const allEmbeddings: number[][] = [];

        for (let i = 0; i < texts.length; i += batchSize) {
            const batch = texts.slice(i, i + batchSize);
            
            let batchResults: number[][] = [];
            let attempts = 0;
            let success = false;

            // SMART RETRY LOOP
            while (attempts < 3 && !success) {
                batchResults = await this._embeddings.embedDocuments(batch);

                const isRateLimited = batchResults.length === 0 || batchResults.every(arr => !arr || arr.length === 0);
                // const isRateLimited = batchResults.some(arr => !arr || arr.length === 0);

                if (!isRateLimited) {
                    success = true; // Data is good, break out of retry loop!
                } else {
                    attempts++;
                    console.warn(`⏳ [Quota Hit] Gemini rate limit reached at chunk ${i}. Waiting 15s to retry (Attempt ${attempts}/3)...`);
                    
                    // Wait 15 seconds for Google's Tokens-Per-Minute quota to cool down
                    await delay(15000); 
                }
            }

            if (!success) {
                console.warn(`❌ Failed to fetch valid embeddings for batch starting at ${i} after 3 attempts.`);
            }

            allEmbeddings.push(...batchResults);

            // Normal small pause between successful batches
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