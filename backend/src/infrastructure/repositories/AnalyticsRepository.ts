import { Model } from "mongoose";
import { AnalyticsFilterDTO } from "../../application/dtos/admin/analytics/analyticsFilter.dto";
import {
    DailyAIUsage,
    FailureStatistics,
    FeatureUsage,
    IAnalyticsRepository,
    LatencyStatistics,
    ModelUsage,
    OverviewMetrics,
    ProviderUsage,
} from "../../domain/repositories/IAnalyticsRepository";
import {
    AIUsageEventLean,
    AIUsageEventModel,
} from "../database/models/AIUsageEvent";
import { buildDateRange } from "../../utils/buildDateRange";


export class AnalyticsRepository implements IAnalyticsRepository {

    constructor(
        private readonly model: Model<AIUsageEventLean> = AIUsageEventModel
    ) { }

    async getOverviewMetrics(
        filter: AnalyticsFilterDTO
    ): Promise<OverviewMetrics> {

        const { startDate, endDate } = buildDateRange(filter);

        const [result] = await this.model.aggregate([

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

                    totalRequests: {
                        $sum: 1,
                    },

                    successfulRequests: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "SUCCESS"] },
                                1,
                                0,
                            ],
                        },
                    },

                    failedRequests: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "FAILED"] },
                                1,
                                0,
                            ],
                        },
                    },

                    averageLatencyMs: {
                        $avg: "$latencyMs",
                    },

                    estimatedCost: {
                        $sum: "$estimatedCost",
                    },
                },
            },

            {
                $project: {
                    _id: 0,
                    totalRequests: 1,
                    successfulRequests: 1,
                    failedRequests: 1,
                    averageLatencyMs: {
                        $round: [
                            "$averageLatencyMs",
                            2,
                        ],
                    },
                    estimatedCost: {
                        $round: [
                            "$estimatedCost",
                            6,
                        ],
                    },
                },
            },
        ]);

        return result ?? {
            totalRequests: 0,
            successfulRequests: 0,
            failedRequests: 0,
            averageLatencyMs: 0,
            estimatedCost: 0,
        };
    }

    async getDailyAIUsage(
        filter: AnalyticsFilterDTO
    ): Promise<DailyAIUsage[]> {

        const { startDate, endDate } = buildDateRange(filter);

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

                    totalRequests: {
                        $sum: 1,
                    },

                    successfulRequests: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: [
                                        "$status",
                                        "SUCCESS",
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },

                    failedRequests: {
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

                    estimatedCost: {
                        $sum: "$estimatedCost",
                    },
                },
            },

            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    totalRequests: 1,
                    successfulRequests: 1,
                    failedRequests: 1,
                    estimatedCost: {
                        $round: [
                            "$estimatedCost",
                            6,
                        ],
                    },
                },
            },

            {
                $sort: {
                    date: 1,
                },
            },
        ]);
    }

    async getFeatureUsage(
        filter: AnalyticsFilterDTO
    ): Promise<FeatureUsage[]> {

        const { startDate, endDate } = buildDateRange(filter);

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
                    _id: "$feature",

                    totalRequests: {
                        $sum: 1,
                    },

                    estimatedCost: {
                        $sum: "$estimatedCost",
                    },
                },
            },

            {
                $project: {
                    _id: 0,
                    feature: "$_id",
                    totalRequests: 1,
                    estimatedCost: {
                        $round: [
                            "$estimatedCost",
                            6,
                        ],
                    },
                },
            },

            {
                $sort: {
                    totalRequests: -1,
                },
            },
        ]);
    }

    async getProviderUsage(
        filter: AnalyticsFilterDTO
    ): Promise<ProviderUsage[]> {

        const { startDate, endDate } = buildDateRange(filter);

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
                    _id: "$provider",

                    totalRequests: {
                        $sum: 1,
                    },

                    estimatedCost: {
                        $sum: "$estimatedCost",
                    },
                },
            },

            {
                $project: {
                    _id: 0,
                    provider: "$_id",
                    totalRequests: 1,
                    estimatedCost: {
                        $round: [
                            "$estimatedCost",
                            6,
                        ],
                    },
                },
            },

            {
                $sort: {
                    totalRequests: -1,
                },
            },
        ]);
    }

    async getModelUsage(
        filter: AnalyticsFilterDTO
    ): Promise<ModelUsage[]> {

        const { startDate, endDate } = buildDateRange(filter);

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

                    _id: "$aiModel",

                    totalRequests: {
                        $sum: 1,
                    },

                    estimatedCost: {
                        $sum: "$estimatedCost",
                    },

                },

            },

            {
                $project: {

                    _id: 0,

                    aiModel: "$_id",

                    totalRequests: 1,

                    estimatedCost: {
                        $round: [
                            "$estimatedCost",
                            6,
                        ],
                    },

                },

            },

            {
                $sort: {
                    totalRequests: -1,
                },
            },

        ]);
    }

    async getFailureStatistics(
        filter: AnalyticsFilterDTO
    ): Promise<FailureStatistics[]> {

        const { startDate, endDate } = buildDateRange(filter);

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

                    _id: "$feature",

                    totalRequests: {
                        $sum: 1,
                    },

                    successfulRequests: {

                        $sum: {

                            $cond: [

                                {
                                    $eq: [
                                        "$status",
                                        "SUCCESS",
                                    ],
                                },

                                1,

                                0,

                            ],

                        },

                    },

                    failedRequests: {

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

                },

            },

            {

                $project: {

                    _id: 0,

                    feature: "$_id",

                    totalRequests: 1,

                    successfulRequests: 1,

                    failedRequests: 1,

                    successRate: {

                        $round: [

                            {

                                $multiply: [

                                    {

                                        $cond: [

                                            {
                                                $eq: [
                                                    "$totalRequests",
                                                    0,
                                                ],
                                            },

                                            0,

                                            {

                                                $divide: [

                                                    "$successfulRequests",

                                                    "$totalRequests",

                                                ],

                                            },

                                        ],

                                    },

                                    100,

                                ],

                            },

                            2,

                        ],

                    },

                },

            },

            {

                $sort: {

                    failedRequests: -1,

                },

            },

        ]);
    }

    async getEstimatedCost(
        filter: AnalyticsFilterDTO
    ): Promise<number> {

        const { startDate, endDate } = buildDateRange(filter);

        const [result] = await this.model.aggregate([

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

                    estimatedCost: {

                        $sum: "$estimatedCost",

                    },

                },

            },

            {

                $project: {

                    _id: 0,

                    estimatedCost: {

                        $round: [

                            "$estimatedCost",

                            6,

                        ],

                    },

                },

            },

        ]);

        return result?.estimatedCost ?? 0;
    }

    async getLatencyStatistics(
        filter: AnalyticsFilterDTO
    ): Promise<LatencyStatistics> {

        const { startDate, endDate } = buildDateRange(filter);

        const [result] = await this.model.aggregate([

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

                    totalRequests: {

                        $sum: 1,

                    },

                    averageLatencyMs: {

                        $avg: "$latencyMs",

                    },

                    minimumLatencyMs: {

                        $min: "$latencyMs",

                    },

                    maximumLatencyMs: {

                        $max: "$latencyMs",

                    },

                },

            },

            {

                $project: {

                    _id: 0,

                    totalRequests: 1,

                    averageLatencyMs: {

                        $round: [

                            "$averageLatencyMs",

                            2,

                        ],

                    },

                    minimumLatencyMs: 1,

                    maximumLatencyMs: 1,

                },

            },

        ]);

        return (

            result ?? {

                totalRequests: 0,

                averageLatencyMs: 0,

                minimumLatencyMs: 0,

                maximumLatencyMs: 0,

            }

        );
    }
}
