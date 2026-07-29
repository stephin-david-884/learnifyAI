import { AIProvider } from "../../../../domain/entities/AIUsageEvent.entity";

export interface EstimateAICostDTO {

    provider: AIProvider;

    aiModel: string;

    requestTokens?: number;

    responseTokens?: number;

    totalTokens?: number;
}