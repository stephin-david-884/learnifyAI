import { IEmbeddingService } from "../../../application/interfaces/services/ai/IEmbeddingService";
import { ISemanticRetrievalService } from "../../../application/interfaces/services/document/ISemanticRetrievalService";
import { DocumentChunk } from "../../../domain/entities/DocumentChunk.entity";
import { IDocumentChunkRepository } from "../../../domain/repositories/IDocumentChunkRepository";

export class SemanticRetrievalService implements ISemanticRetrievalService {

    constructor(
        private readonly _embeddingService: IEmbeddingService,
        private readonly _documentChunkRepository: IDocumentChunkRepository,
        private readonly _retrievalLimitPerTopic = 5,
    ) { }

    async retrieveByTopics(documentId: string, topics: string[]): Promise<DocumentChunk[]> {
        
        if(topics.length === 0) {
            return [];
        }

        const embeddings = await this._embeddingService.generateEmbeddings(topics);

        const chunkMap = new Map<string, DocumentChunk>();

        // Retrieve chunk for each topic embedding
        for (const embedding of embeddings) {

            const chunks = await this._documentChunkRepository.findSimilarChunks(embedding, this._retrievalLimitPerTopic, documentId);

            for(const chunk of chunks) {
                chunkMap.set(chunk.getId(), chunk);
            }
        }

        const uniqueChunks = Array.from(chunkMap.values());

        uniqueChunks.sort((a, b) => a.metadata.chunkIndex - b.metadata.chunkIndex);

        return uniqueChunks;
    }
}