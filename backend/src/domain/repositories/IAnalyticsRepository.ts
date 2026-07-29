import { AnalyticsFilterDTO } from "../../application/dtos/admin/analytics/analyticsFilter.dto";
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

    getOverviewMetrics(filter: AnalyticsFilterDTO): Promise<OverviewMetrics>;

    getDailyAIUsage(filter: AnalyticsFilterDTO): Promise<DailyAIUsage[]>;

    getFeatureUsage(filter: AnalyticsFilterDTO): Promise<FeatureUsage[]>;

    getProviderUsage(filter: AnalyticsFilterDTO): Promise<ProviderUsage[]>;

    getModelUsage(filter: AnalyticsFilterDTO): Promise<ModelUsage[]>;

    getFailureStatistics(filter: AnalyticsFilterDTO): Promise<FailureStatistics[]>;

    getEstimatedCost(filter: AnalyticsFilterDTO): Promise<number>;

    getLatencyStatistics(filter: AnalyticsFilterDTO): Promise<LatencyStatistics>;
}