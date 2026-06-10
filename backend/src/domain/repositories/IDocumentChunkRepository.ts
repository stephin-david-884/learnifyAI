import { DocumentChunk } from "../entities/DocumentChunk.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IDocumentChunkRepository extends IBaseRepository<DocumentChunk> {

    createMany(chunks: DocumentChunk[]): Promise<DocumentChunk[]>;

    findByDocumentId(documentId: string): Promise<DocumentChunk[]>;

    deleteByDocumentId(documentId: string): Promise<void>;

    findSimilarChunks(embedding: number[], limit: number, documentId?: string): Promise<DocumentChunk[]>;

    findByDocumentAndTopics(documentId: string,topics: string[]): Promise<DocumentChunk[]>;
}