import { RecordAIUsageContextDTO } from "../../../dtos/admin/analytics/recordAIUsageContext.dto";

export interface AIUsageMetrics {

    requestTokens?: number;

    responseTokens?: number;

    totalTokens?: number;
}

export interface AIUsageRecorderResult<T> {

    result: T;

    usage?: AIUsageMetrics;
}

export interface IAIUsageRecorder {
    record<T>(
        context: RecordAIUsageContextDTO,
        operation: () => Promise<AIUsageRecorderResult<T>>
    ): Promise<T>;
}