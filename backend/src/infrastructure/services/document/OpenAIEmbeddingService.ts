import { OpenAIEmbeddings} from "@langchain/openai";
import { IEmbeddingService } from "../../../application/interfaces/services/ai/IEmbeddingService";

export class OpenAIEmbeddingService implements IEmbeddingService {
    private readonly _embeddings;

    constructor() {
        this._embeddings = new OpenAIEmbeddings({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async generateEmbedding(text: string): Promise<number[]> {
        
        return await this._embeddings.embedQuery(text);
    }

    async generateEmbeddings(texts: string[]): Promise<number[][]> {
        
        return await this._embeddings.embedDocuments(texts);
    }
}