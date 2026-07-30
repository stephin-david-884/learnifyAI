import { AnalyticsFilterDTO } from "../../../dtos/admin/analytics/analyticsFilter.dto";
import { GetUserAnalyticsResponseDTO } from "../../../dtos/admin/analytics/GetUserAnalytics.dto";


export interface IGetUserAnalytics {

    execute(
        filter: AnalyticsFilterDTO
    ): Promise<GetUserAnalyticsResponseDTO>;

}