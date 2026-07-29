import {
    DailyAIUsage,
    FailureStatistics,
    FeatureUsage,
    LatencyStatistics,
    ModelUsage,
    OverviewMetrics,
    ProviderUsage,
} from "../../../../domain/repositories/IAnalyticsRepository";

export interface GetAIAnalyticsResponseDTO {

    overview: OverviewMetrics;

    dailyUsage: DailyAIUsage[];

    featureUsage: FeatureUsage[];

    providerUsage: ProviderUsage[];

    modelUsage: ModelUsage[];

    failureStatistics: FailureStatistics[];

    estimatedCost: number;

    latencyStatistics: LatencyStatistics;

}