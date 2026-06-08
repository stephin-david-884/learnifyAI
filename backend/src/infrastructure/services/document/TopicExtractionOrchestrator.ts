import { IContentGenerationService } from "../../../application/interfaces/services/ai/IContentGenerationService";
import { ITopicExtractionOrchestrator } from "../../../application/interfaces/services/document/ITopicExtractionOrchestrator";
import { DocumentTopic } from "../../../domain/entities/Document.entity";

export class TopicExtractionOrchestrator implements ITopicExtractionOrchestrator {

    constructor(
        private readonly topicExtractionService: IContentGenerationService
    ) { }

    async extractTopicsFromChunks(chunks: { content: string; }[]): Promise<DocumentTopic[]> {
        const batchSize = 50;

        const chunkBatches: typeof chunks[] = [];

        for (let i = 0; i < chunks.length; i += batchSize) {
            chunkBatches.push(
                chunks.slice(i, i + batchSize)
            );
        }

        // const allTopics: DocumentTopic[] = [];
        // for (const batch of chunkBatches) {

        //     const content =
        //         batch
        //             .map(chunk => chunk.content)
        //             .join("\n\n");

        //     const topics =
        //         await this.topicExtractionService
        //             .extractTopics(content);

        //     allTopics.push(...topics);
        // }

        const topicResults = await Promise.all(
            chunkBatches.map((batch) => {

                const content = batch.map(chunk => chunk.content).join("\n\n");

                return this.topicExtractionService.extractTopics(content);
            })
        );

        const allTopics: DocumentTopic[] = topicResults.flat();

        const topicMap = new Map<
            string,
            {
                name: string;
                count: number;
                totalScore: number;
            }
        >();

        for (const topic of allTopics) {

            const key = topic.name.trim().toLowerCase();

            const existing =
                topicMap.get(key);

            if (existing) {

                existing.count += 1;

                existing.totalScore +=
                    topic.score;

            } else {

                topicMap.set(key, {
                    name: topic.name.trim(),
                    count: 1,
                    totalScore: topic.score,
                });
            }
        }

        return [...topicMap.entries()]
            .map(([_, value]) => ({
                name: value.name,
                score: Math.round(
                    value.totalScore / value.count
                ),
                frequency: value.count,
            }))
            .sort((a, b) => {
                if (b.frequency !== a.frequency) {
                    return b.frequency - a.frequency;
                }

                return b.score - a.score;
            })
            .slice(0, 20)
            .map(topic => ({
                name: topic.name,
                score: topic.score,
            }));
    }
}