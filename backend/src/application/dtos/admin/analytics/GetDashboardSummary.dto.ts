import { GetAIAnalyticsResponseDTO } from "./GetAIAnalytics.dto";
import { GetDocumentAnalyticsResponseDTO } from "./GetDocumentAnalytics.dto";
import { GetRevenueAnalyticsResponseDTO } from "./GetRevenueAnalytics.dto";
import { GetUserAnalyticsResponseDTO } from "./GetUserAnalytics.dto";

export interface GetDashboardSummaryResponseDTO {

    ai: GetAIAnalyticsResponseDTO;

    users: GetUserAnalyticsResponseDTO;

    documents: GetDocumentAnalyticsResponseDTO;

    revenue: GetRevenueAnalyticsResponseDTO;

}