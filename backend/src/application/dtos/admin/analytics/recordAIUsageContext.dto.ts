import { AIProvider, AIUsageFeature, AIUsageMetadata } from "../../../../domain/entities/AIUsageEvent.entity";

export interface RecordAIUsageContextDTO {

    provider: AIProvider;

    feature: AIUsageFeature;

    aiModel: string;

    userId?: string;

    documentId?: string;

    metadata?: AIUsageMetadata;
}