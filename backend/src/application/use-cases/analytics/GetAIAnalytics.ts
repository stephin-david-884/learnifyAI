import { AnalyticsFilterDTO } from "../../dtos/admin/analytics/analyticsFilter.dto";
import { GetAIAnalyticsResponseDTO } from "../../dtos/admin/analytics/GetAIAnalytics.dto";
import { IAnalyticsRepository } from "../../../domain/repositories/IAnalyticsRepository";
import { IGetAIAnalytics } from "../../interfaces/usecases/analytics/IGetAIAnalytics";

export class GetAIAnalytics implements IGetAIAnalytics {

    constructor(
        private readonly analyticsRepository: IAnalyticsRepository,
    ) {}

    async execute(
        filter: AnalyticsFilterDTO
    ): Promise<GetAIAnalyticsResponseDTO> {

        const [

            overview,

            dailyUsage,

            featureUsage,

            providerUsage,

            modelUsage,

            failureStatistics,

            estimatedCost,

            latencyStatistics,

        ] = await Promise.all([

            this.analyticsRepository.getOverviewMetrics(filter),

            this.analyticsRepository.getDailyAIUsage(filter),

            this.analyticsRepository.getFeatureUsage(filter),

            this.analyticsRepository.getProviderUsage(filter),

            this.analyticsRepository.getModelUsage(filter),

            this.analyticsRepository.getFailureStatistics(filter),

            this.analyticsRepository.getEstimatedCost(filter),

            this.analyticsRepository.getLatencyStatistics(filter),

        ]);

        return {

            overview,

            dailyUsage,

            featureUsage,

            providerUsage,

            modelUsage,

            failureStatistics,

            estimatedCost,

            latencyStatistics,

        };

    }

}