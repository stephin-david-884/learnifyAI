import { Model } from "mongoose";
import { AnalyticsFilterDTO } from "../../application/dtos/admin/analytics/analyticsFilter.dto";
import {
    DocumentMimeTypeBreakdown,
    DocumentOverview,
    DocumentStatusBreakdown,
    DocumentUploadTrend,
    IDocumentAnalyticsRepository,
} from "../../domain/repositories/IDocumentAnalyticsRepository";
import { DocumentLean, DocumentModel } from "../database/models/Document";
import { buildDateRange } from "../../utils/buildDateRange";

export class DocumentAnalyticsRepository
    implements IDocumentAnalyticsRepository {

    constructor(
        private readonly model: Model<DocumentLean> = DocumentModel,
    ) {}

    async getOverview(
        filter: AnalyticsFilterDTO,
    ): Promise<DocumentOverview> {

        const { startDate, endDate } =
            buildDateRange(filter);

        const [result] =
            await this.model.aggregate([

                {
                    $match: {
                        createdAt: {
                            $gte: startDate,
                            $lte: endDate,
                        },
                    },
                },

                {
                    $group: {

                        _id: null,

                        totalDocuments: {
                            $sum: 1,
                        },

                        readyDocuments: {

                            $sum: {

                                $cond: [

                                    {
                                        $eq: [
                                            "$status",
                                            "READY",
                                        ],
                                    },

                                    1,

                                    0,

                                ],

                            },

                        },

                        processingDocuments: {

                            $sum: {

                                $cond: [

                                    {
                                        $eq: [
                                            "$status",
                                            "PROCESSING",
                                        ],
                                    },

                                    1,

                                    0,

                                ],

                            },

                        },

                        failedDocuments: {

                            $sum: {

                                $cond: [

                                    {
                                        $eq: [
                                            "$status",
                                            "FAILED",
                                        ],
                                    },

                                    1,

                                    0,

                                ],

                            },

                        },

                        uploadingDocuments: {

                            $sum: {

                                $cond: [

                                    {
                                        $eq: [
                                            "$status",
                                            "UPLOADING",
                                        ],
                                    },

                                    1,

                                    0,

                                ],

                            },

                        },

                        totalPages: {

                            $sum: {

                                $ifNull: [

                                    "$totalPages",

                                    0,

                                ],

                            },

                        },

                        totalStorageBytes: {

                            $sum: "$fileSize",

                        },

                        averageFileSizeBytes: {

                            $avg: "$fileSize",

                        },

                    },

                },

                {
                    $project: {

                        _id: 0,

                        totalDocuments: 1,

                        readyDocuments: 1,

                        processingDocuments: 1,

                        failedDocuments: 1,

                        uploadingDocuments: 1,

                        totalPages: 1,

                        totalStorageBytes: 1,

                        averageFileSizeBytes: {

                            $round: [

                                "$averageFileSizeBytes",

                                2,

                            ],

                        },

                    },

                },

            ]);

        return result ?? {

            totalDocuments: 0,

            readyDocuments: 0,

            processingDocuments: 0,

            failedDocuments: 0,

            uploadingDocuments: 0,

            totalPages: 0,

            totalStorageBytes: 0,

            averageFileSizeBytes: 0,

        };

    }

    async getUploadTrend(
        filter: AnalyticsFilterDTO,
    ): Promise<DocumentUploadTrend[]> {

        const { startDate, endDate } =
            buildDateRange(filter);

        return await this.model.aggregate([

            {
                $match: {

                    createdAt: {

                        $gte: startDate,

                        $lte: endDate,

                    },

                },

            },

            {

                $group: {

                    _id: {

                        $dateToString: {

                            format: "%Y-%m-%d",

                            date: "$createdAt",

                        },

                    },

                    uploads: {

                        $sum: 1,

                    },

                },

            },

            {

                $project: {

                    _id: 0,

                    date: "$_id",

                    uploads: 1,

                },

            },

            {

                $sort: {

                    date: 1,

                },

            },

        ]);

    }

    async getStatusBreakdown(
        filter: AnalyticsFilterDTO,
    ): Promise<DocumentStatusBreakdown[]> {

        const { startDate, endDate } =
            buildDateRange(filter);

        return await this.model.aggregate([

            {

                $match: {

                    createdAt: {

                        $gte: startDate,

                        $lte: endDate,

                    },

                },

            },

            {

                $group: {

                    _id: "$status",

                    totalDocuments: {

                        $sum: 1,

                    },

                },

            },

            {

                $project: {

                    _id: 0,

                    status: "$_id",

                    totalDocuments: 1,

                },

            },

            {

                $sort: {

                    totalDocuments: -1,

                },

            },

        ]);

    }

    async getMimeTypeBreakdown(
        filter: AnalyticsFilterDTO,
    ): Promise<DocumentMimeTypeBreakdown[]> {

        const { startDate, endDate } =
            buildDateRange(filter);

        return await this.model.aggregate([

            {

                $match: {

                    createdAt: {

                        $gte: startDate,

                        $lte: endDate,

                    },

                },

            },

            {

                $group: {

                    _id: "$mimeType",

                    totalDocuments: {

                        $sum: 1,

                    },

                },

            },

            {

                $project: {

                    _id: 0,

                    mimeType: "$_id",

                    totalDocuments: 1,

                },

            },

            {

                $sort: {

                    totalDocuments: -1,

                },

            },

        ]);

    }

}