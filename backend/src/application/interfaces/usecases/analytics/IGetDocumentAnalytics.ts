import { AnalyticsFilterDTO } from "../../../dtos/admin/analytics/analyticsFilter.dto";
import { GetDocumentAnalyticsResponseDTO } from "../../../dtos/admin/analytics/GetDocumentAnalytics.dto";


export interface IGetDocumentAnalytics {

    execute(
        filter: AnalyticsFilterDTO
    ): Promise<GetDocumentAnalyticsResponseDTO>;

}