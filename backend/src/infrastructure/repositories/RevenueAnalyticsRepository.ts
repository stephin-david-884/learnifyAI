import { Model } from "mongoose";
import { BillingCycleBreakdown, IRevenueAnalyticsRepository, PlanRevenueBreakdown, RevenueOverview, RevenueTrend, SubscriptionStatusBreakdown } from "../../domain/repositories/IRevenueAnalyticsRepository";
import { UserSubscriptionLean, UserSubscriptionModel } from "../database/models/UserSubscription";
import { AnalyticsFilterDTO } from "../../application/dtos/admin/analytics/analyticsFilter.dto";
import { buildDateRange } from "../../utils/buildDateRange";

export class RevenueAnalyticsRepository implements IRevenueAnalyticsRepository {

    constructor(
        private readonly model: Model<UserSubscriptionLean> = UserSubscriptionModel,
    ) { }

    async getOverview(
        filter: AnalyticsFilterDTO
    ): Promise<RevenueOverview> {

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

                        totalRevenue: {

                            $sum: "$planSnapshot.price",

                        },

                        totalSubscriptions: {

                            $sum: 1,

                        },

                        activeSubscriptions: {

                            $sum: {

                                $cond: [

                                    {

                                        $eq: [

                                            "$status",

                                            "ACTIVE",

                                        ],

                                    },

                                    1,

                                    0,

                                ],

                            },

                        },

                        expiredSubscriptions: {

                            $sum: {

                                $cond: [

                                    {

                                        $eq: [

                                            "$status",

                                            "EXPIRED",

                                        ],

                                    },

                                    1,

                                    0,

                                ],

                            },

                        },

                        cancelledSubscriptions: {

                            $sum: {

                                $cond: [

                                    {

                                        $eq: [

                                            "$status",

                                            "CANCELLED",

                                        ],

                                    },

                                    1,

                                    0,

                                ],

                            },

                        },

                        averageRevenuePerSubscription: {

                            $avg: "$planSnapshot.price",

                        },

                    },

                },

                {

                    $project: {

                        _id: 0,

                        totalRevenue: 1,

                        totalSubscriptions: 1,

                        activeSubscriptions: 1,

                        expiredSubscriptions: 1,

                        cancelledSubscriptions: 1,

                        averageRevenuePerSubscription: {

                            $round: [

                                "$averageRevenuePerSubscription",

                                2,

                            ],

                        },

                    },

                },

            ]);

        return result ?? {

            totalRevenue: 0,

            totalSubscriptions: 0,

            activeSubscriptions: 0,

            expiredSubscriptions: 0,

            cancelledSubscriptions: 0,

            averageRevenuePerSubscription: 0,

        };

    }

    async getRevenueTrend(
        filter: AnalyticsFilterDTO
    ): Promise<RevenueTrend[]> {

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

                    revenue: {

                        $sum: "$planSnapshot.price",

                    },

                },

            },

            {

                $project: {

                    _id: 0,

                    date: "$_id",

                    revenue: 1,

                },

            },

            {

                $sort: {

                    date: 1,

                },

            },

        ]);

    }

    async getPlanBreakdown(
        filter: AnalyticsFilterDTO
    ): Promise<PlanRevenueBreakdown[]> {

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

                        planName: "$planSnapshot.name",

                        billingCycle: "$planSnapshot.billingCycle",

                    },

                    subscriptions: {

                        $sum: 1,

                    },

                    revenue: {

                        $sum: "$planSnapshot.price",

                    },

                },

            },

            {

                $project: {

                    _id: 0,

                    planName: "$_id.planName",

                    billingCycle: "$_id.billingCycle",

                    subscriptions: 1,

                    revenue: 1,

                },

            },

            {

                $sort: {

                    revenue: -1,

                },

            },

        ]);

    }

    async getBillingCycleBreakdown(
        filter: AnalyticsFilterDTO
    ): Promise<BillingCycleBreakdown[]> {

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

                    _id: "$planSnapshot.billingCycle",

                    subscriptions: {

                        $sum: 1,

                    },

                    revenue: {

                        $sum: "$planSnapshot.price",

                    },

                },

            },

            {

                $project: {

                    _id: 0,

                    billingCycle: "$_id",

                    subscriptions: 1,

                    revenue: 1,

                },

            },

            {

                $sort: {

                    revenue: -1,

                },

            },

        ]);

    }

    async getStatusBreakdown(
        filter: AnalyticsFilterDTO
    ): Promise<SubscriptionStatusBreakdown[]> {

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

                    subscriptions: {

                        $sum: 1,

                    },

                },

            },

            {

                $project: {

                    _id: 0,

                    status: "$_id",

                    subscriptions: 1,

                },

            },

            {

                $sort: {

                    subscriptions: -1,

                },

            },

        ]);

    }
}