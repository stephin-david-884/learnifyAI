import { IDocumentAnalyticsRepository } from "../../../domain/repositories/IDocumentAnalyticsRepository";
import { AnalyticsFilterDTO } from "../../dtos/admin/analytics/analyticsFilter.dto";
import { GetDocumentAnalyticsResponseDTO } from "../../dtos/admin/analytics/GetDocumentAnalytics.dto";
import { IGetDocumentAnalytics } from "../../interfaces/usecases/analytics/IGetDocumentAnalytics";

export class GetDocumentAnalytics
    implements IGetDocumentAnalytics {

    constructor(
        private readonly documentAnalyticsRepository: IDocumentAnalyticsRepository,
    ) {}

    async execute(
        filter: AnalyticsFilterDTO,
    ): Promise<GetDocumentAnalyticsResponseDTO> {

        const [

            overview,

            uploadTrend,

            statusBreakdown,

            mimeTypeBreakdown,

        ] = await Promise.all([

            this.documentAnalyticsRepository.getOverview(filter),

            this.documentAnalyticsRepository.getUploadTrend(filter),

            this.documentAnalyticsRepository.getStatusBreakdown(filter),

            this.documentAnalyticsRepository.getMimeTypeBreakdown(filter),

        ]);

        return {

            overview,

            uploadTrend,

            statusBreakdown,

            mimeTypeBreakdown,

        };

    }

}