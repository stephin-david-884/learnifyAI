import { AnalyticsFilterDTO } from "../../dtos/admin/analytics/analyticsFilter.dto";
import { GetDashboardSummaryResponseDTO } from "../../dtos/admin/analytics/GetDashboardSummary.dto";
import { IGetAIAnalytics } from "../../interfaces/usecases/analytics/IGetAIAnalytics";
import { IGetDashboardSummary } from "../../interfaces/usecases/analytics/IGetDashboardSummary";
import { IGetDocumentAnalytics } from "../../interfaces/usecases/analytics/IGetDocumentAnalytics";
import { IGetRevenueAnalytics } from "../../interfaces/usecases/analytics/IGetRevenueAnalytics";
import { IGetUserAnalytics } from "../../interfaces/usecases/analytics/IGetUserAnalytics";

export class GetDashboardSummary
    implements IGetDashboardSummary {

    constructor(

        private readonly getAIAnalytics: IGetAIAnalytics,

        private readonly getUserAnalytics: IGetUserAnalytics,

        private readonly getDocumentAnalytics: IGetDocumentAnalytics,

        private readonly getRevenueAnalytics: IGetRevenueAnalytics,

    ) {}

    async execute(
        filter: AnalyticsFilterDTO
    ): Promise<GetDashboardSummaryResponseDTO> {

        const [

            ai,

            users,

            documents,

            revenue,

        ] = await Promise.all([

            this.getAIAnalytics.execute(filter),

            this.getUserAnalytics.execute(filter),

            this.getDocumentAnalytics.execute(filter),

            this.getRevenueAnalytics.execute(filter),

        ]);

        return {

            ai,

            users,

            documents,

            revenue,

        };

    }

}