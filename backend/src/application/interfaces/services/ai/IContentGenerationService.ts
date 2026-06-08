import { DocumentTopic } from "../../../../domain/entities/Document.entity";

export interface IContentGenerationService {
    extractTopics(
        content: string
    ): Promise<DocumentTopic[]>;
}