import { GoogleGenerativeAIEmbeddings }
from "@langchain/google-genai";

import { IEmbeddingService }
from "../../../application/interfaces/services/document/IEmbeddingService";

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

    async generateEmbeddings(
        texts: string[]
    ): Promise<number[][]> {

        const embeddings = await this._embeddings.embedDocuments(texts);

        if (!embeddings || !Array.isArray(embeddings) || embeddings.length !== texts.length) {
            throw new Error("Failed to generate bulk embeddings accurately.");
        }

        return embeddings;
    }
}