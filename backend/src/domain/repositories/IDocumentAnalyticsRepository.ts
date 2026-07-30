import { AnalyticsFilterDTO } from "../../application/dtos/admin/analytics/analyticsFilter.dto";
import { DocumentStatus } from "../entities/Document.entity";

export interface DocumentOverview {

    totalDocuments: number;

    readyDocuments: number;

    processingDocuments: number;

    failedDocuments: number;

    uploadingDocuments: number;

    totalPages: number;

    totalStorageBytes: number;

    averageFileSizeBytes: number;

}

export interface DocumentUploadTrend {

    date: string;

    uploads: number;

}

export interface DocumentStatusBreakdown {

    status: DocumentStatus;

    totalDocuments: number;

}

export interface DocumentMimeTypeBreakdown {

    mimeType: string;

    totalDocuments: number;

}

export interface IDocumentAnalyticsRepository {

    getOverview(
        filter: AnalyticsFilterDTO
    ): Promise<DocumentOverview>;

    getUploadTrend(
        filter: AnalyticsFilterDTO
    ): Promise<DocumentUploadTrend[]>;

    getStatusBreakdown(
        filter: AnalyticsFilterDTO
    ): Promise<DocumentStatusBreakdown[]>;

    getMimeTypeBreakdown(
        filter: AnalyticsFilterDTO
    ): Promise<DocumentMimeTypeBreakdown[]>;

}