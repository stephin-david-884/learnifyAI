import { AnalyticsFilterDTO } from "../../../dtos/admin/analytics/analyticsFilter.dto";
import { GetDashboardSummaryResponseDTO } from "../../../dtos/admin/analytics/GetDashboardSummary.dto";

export interface IGetDashboardSummary {

    execute(
        filter: AnalyticsFilterDTO
    ): Promise<GetDashboardSummaryResponseDTO>;

}