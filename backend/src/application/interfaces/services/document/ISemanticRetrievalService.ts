import { DocumentChunk } from "../../../../domain/entities/DocumentChunk.entity";

export interface ISemanticRetrievalService {
    retrieveByTopics(documentId: string, topics: string[]): Promise<DocumentChunk[]>;
}