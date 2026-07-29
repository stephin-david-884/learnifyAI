import { RecordAIUsageContextDTO } from "../../../application/dtos/admin/analytics/recordAIUsageContext.dto";
import { IAICostEstimator } from "../../../application/interfaces/services/analytics/IAICostEstimator";
import { AIUsageRecorderResult, IAIUsageRecorder } from "../../../application/interfaces/services/analytics/IAIUsageRecorder";
import { IAIUsageTracker } from "../../../application/interfaces/services/analytics/IAIUsageTracker";

export class AIUsageRecorder implements IAIUsageRecorder {

    constructor(
        private readonly tracker: IAIUsageTracker,
        private readonly estimator: IAICostEstimator,
    ) { }

    async record<T>(
        context: RecordAIUsageContextDTO,
        operation: () => Promise<AIUsageRecorderResult<T>>
    ): Promise<T> {

        const startedAt = Date.now();

        try {

            const { result, usage } = await operation();

            const latencyMs = Date.now() - startedAt;

            const estimatedCost = this.estimator.estimate({
                provider: context.provider,
                aiModel: context.aiModel,
                requestTokens: usage?.requestTokens,
                responseTokens: usage?.responseTokens,
                totalTokens: usage?.totalTokens,
            });

            await this.tracker.recordUsage({
                provider: context.provider,
                feature: context.feature,
                aiModel: context.aiModel,
                userId: context.userId,
                documentId: context.documentId,
                requestTokens: usage?.requestTokens,
                responseTokens: usage?.responseTokens,
                totalTokens: usage?.totalTokens,
                latencyMs,
                estimatedCost,
                status: "SUCCESS",
                metadata: context.metadata,
            });

            return result;

        } catch (error) {

            const latencyMs = Date.now() - startedAt;

            const estimatedCost = this.estimator.estimate({
                provider: context.provider,
                aiModel: context.aiModel,
            });

            await this.tracker.recordUsage({
                provider: context.provider,
                feature: context.feature,
                aiModel: context.aiModel,
                userId: context.userId,
                documentId: context.documentId,
                latencyMs,
                estimatedCost,
                status: "FAILED",
                error: error instanceof Error ? error.message : "Unknown error",
                metadata: context.metadata,
            });

            throw error;
        }
    }
}