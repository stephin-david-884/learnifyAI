import { AnalyticsFilterDTO } from "../../../dtos/admin/analytics/analyticsFilter.dto";
import { GetAIAnalyticsResponseDTO } from "../../../dtos/admin/analytics/GetAIAnalytics.dto";


export interface IGetAIAnalytics {

    execute(
        filter: AnalyticsFilterDTO
    ): Promise<GetAIAnalyticsResponseDTO>;

}