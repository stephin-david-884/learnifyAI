import { AIProvider, AIUsageFeature } from "../entities/AIUsageEvent.entity";


export interface OverviewMetrics {

    totalRequests: number;

    successfulRequests: number;

    failedRequests: number;

    averageLatencyMs: number;

    estimatedCost: number;
}

export interface DailyAIUsage {

    date: string;

    totalRequests: number;

    successfulRequests: number;

    failedRequests: number;

    estimatedCost: number;
}

export interface FeatureUsage {

    feature: AIUsageFeature;

    totalRequests: number;

    estimatedCost: number;
}

export interface ProviderUsage {

    provider: AIProvider;

    totalRequests: number;

    estimatedCost: number;
}

export interface ModelUsage {

    aiModel: string;

    totalRequests: number;

    estimatedCost: number;
}

export interface FailureStatistics {

    feature: AIUsageFeature;

    totalRequests: number;

    successfulRequests: number;

    failedRequests: number;

    successRate: number;
}

export interface LatencyStatistics {

    averageLatencyMs: number;

    minimumLatencyMs: number;

    maximumLatencyMs: number;

    totalRequests: number;
}

export interface IAnalyticsRepository {

    getOverviewMetrics(): Promise<OverviewMetrics>;

    getDailyAIUsage(days: number): Promise<DailyAIUsage[]>;

    getFeatureUsage(): Promise<FeatureUsage[]>;

    getProviderUsage(): Promise<ProviderUsage[]>;

    getModelUsage(): Promise<ModelUsage[]>;

    getFailureStatistics(): Promise<FailureStatistics[]>;

    getEstimatedCost(days: number): Promise<number>;

    getLatencyStatistics(): Promise<LatencyStatistics>;
}