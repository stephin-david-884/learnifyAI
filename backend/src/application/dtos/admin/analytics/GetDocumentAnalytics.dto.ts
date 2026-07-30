import {
    DocumentMimeTypeBreakdown,
    DocumentOverview,
    DocumentStatusBreakdown,
    DocumentUploadTrend,
} from "../../domain/repositories/IDocumentAnalyticsRepository";

export interface GetDocumentAnalyticsResponseDTO {

    overview: DocumentOverview;

    uploadTrend: DocumentUploadTrend[];

    statusBreakdown: DocumentStatusBreakdown[];

    mimeTypeBreakdown: DocumentMimeTypeBreakdown[];

}