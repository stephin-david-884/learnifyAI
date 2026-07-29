import { AIProvider, AIUsageFeature, AIUsageMetadata, AIUsageStatus } from "../../../../domain/entities/AIUsageEvent.entity";

export interface RecordAIUsageDTO {

    provider: AIProvider;

    feature: AIUsageFeature;

    aiModel: string;

    latencyMs: number;

    estimatedCost: number;

    status: AIUsageStatus;

    userId?: string;

    documentId?: string;

    requestTokens?: number;

    responseTokens?: number;

    totalTokens?: number;

    error?: string;

    metadata?: AIUsageMetadata;
}