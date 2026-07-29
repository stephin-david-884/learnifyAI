import { AIUsageEvent } from "../../domain/entities/AIUsageEvent.entity";
import { AIUsageEventLean } from "../../infrastructure/database/models/AIUsageEvent";

export const toDomainAIUsageEvent = (
    dbEvent: AIUsageEventLean
): AIUsageEvent => {

    return new AIUsageEvent({

        id: dbEvent._id.toString(),

        provider: dbEvent.provider,

        feature: dbEvent.feature,

        aiModel: dbEvent.aiModel,

        userId: dbEvent.userId?.toString() ?? undefined,

        documentId: dbEvent.documentId?.toString() ?? undefined,

        requestTokens: dbEvent.requestTokens ?? undefined,

        responseTokens: dbEvent.responseTokens ?? undefined,

        totalTokens: dbEvent.totalTokens ?? undefined,

        estimatedCost: dbEvent.estimatedCost,

        latencyMs: dbEvent.latencyMs,

        status: dbEvent.status,

        error: dbEvent.error ?? undefined,

        metadata: dbEvent.metadata ?? {},

        createdAt: dbEvent.createdAt,
    });
};

export const toPersistenceAIUsageEvent = (
    event: AIUsageEvent
) => {

    return {

        provider: event.provider,

        feature: event.feature,

        aiModel: event.aiModel,

        userId: event.userId ?? null,

        documentId: event.documentId ?? null,

        requestTokens: event.requestTokens ?? null,

        responseTokens: event.responseTokens ?? null,

        totalTokens: event.totalTokens ?? null,

        estimatedCost: event.estimatedCost,

        latencyMs: event.latencyMs,

        status: event.status,

        error: event.error ?? null,

        metadata: event.metadata ?? {},
    };
};