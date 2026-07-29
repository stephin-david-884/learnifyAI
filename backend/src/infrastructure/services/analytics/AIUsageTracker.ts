import { RecordAIUsageDTO } from "../../../application/dtos/admin/analytics/recordAIUsage.dto";
import { IAIUsageTracker } from "../../../application/interfaces/services/analytics/IAIUsageTracker";
import { AIUsageEvent } from "../../../domain/entities/AIUsageEvent.entity";
import { IAIUsageRepository } from "../../../domain/repositories/IAIUsageRepository";

export class AIUsageTracker implements IAIUsageTracker {

    constructor(
        private readonly _repository: IAIUsageRepository,
    ) { }

    async recordUsage(data: RecordAIUsageDTO): Promise<void> {

        const event = new AIUsageEvent({
            provider: data.provider,

            feature: data.feature,

            aiModel: data.aiModel,

            userId: data.userId,

            documentId: data.documentId,

            requestTokens: data.requestTokens,

            responseTokens: data.responseTokens,

            totalTokens: data.totalTokens,

            estimatedCost: data.estimatedCost,

            latencyMs: data.latencyMs,

            status: data.status,

            error: data.error,

            metadata: data.metadata,
        });

        await this._repository.save(event);
    }
}