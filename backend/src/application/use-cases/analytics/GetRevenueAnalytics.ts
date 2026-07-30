import { IRevenueAnalyticsRepository } from "../../../domain/repositories/IRevenueAnalyticsRepository";
import { AnalyticsFilterDTO } from "../../dtos/admin/analytics/analyticsFilter.dto";
import { GetRevenueAnalyticsResponseDTO } from "../../dtos/admin/analytics/GetRevenueAnalytics.dto";
import { IGetRevenueAnalytics } from "../../interfaces/usecases/analytics/IGetRevenueAnalytics";

export class GetRevenueAnalytics
    implements IGetRevenueAnalytics {

    constructor(
        private readonly revenueAnalyticsRepository: IRevenueAnalyticsRepository,
    ) {}

    async execute(
        filter: AnalyticsFilterDTO,
    ): Promise<GetRevenueAnalyticsResponseDTO> {

        const [

            overview,

            revenueTrend,

            planBreakdown,

            billingCycleBreakdown,

            statusBreakdown,

        ] = await Promise.all([

            this.revenueAnalyticsRepository.getOverview(filter),

            this.revenueAnalyticsRepository.getRevenueTrend(filter),

            this.revenueAnalyticsRepository.getPlanBreakdown(filter),

            this.revenueAnalyticsRepository.getBillingCycleBreakdown(filter),

            this.revenueAnalyticsRepository.getStatusBreakdown(filter),

        ]);

        return {

            overview,

            revenueTrend,

            planBreakdown,

            billingCycleBreakdown,

            statusBreakdown,

        };

    }

}