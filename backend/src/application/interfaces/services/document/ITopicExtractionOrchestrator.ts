import { DocumentTopic } from "../../../../domain/entities/Document.entity";

export interface ITopicExtractionOrchestrator {

    extractTopicsFromChunks(chunks: {content: string}[]): Promise<DocumentTopic[]>
}