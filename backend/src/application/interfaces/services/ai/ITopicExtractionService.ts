export interface ITopicExtractionService {
    extractTopics(content: string): Promise<string[]>;
}