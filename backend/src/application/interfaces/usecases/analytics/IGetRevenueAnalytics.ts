import { AnalyticsFilterDTO } from "../../../dtos/admin/analytics/analyticsFilter.dto";
import { GetRevenueAnalyticsResponseDTO } from "../../../dtos/admin/analytics/GetRevenueAnalytics.dto";


export interface IGetRevenueAnalytics {

    execute(
        filter: AnalyticsFilterDTO
    ): Promise<GetRevenueAnalyticsResponseDTO>;

}