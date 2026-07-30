import { Model } from "mongoose";
import { IUserAnalyticsRepository, UserOverview, UserRegistrationTrend } from "../../domain/repositories/IUserAnalyticsRepository";
import { UserLean, UserModel } from "../database/models/User";
import { buildDateRange } from "../../utils/buildDateRange";
import { AnalyticsFilterDTO } from "../../application/dtos/admin/analytics/analyticsFilter.dto";

export class UserAnalyticsRepository implements IUserAnalyticsRepository {

    constructor(
        private readonly model: Model<UserLean> = UserModel
    ) { }

    async getOverview(
        filter: AnalyticsFilterDTO
    ): Promise<UserOverview> {

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

                        totalUsers: {

                            $sum: 1,

                        },

                        freeUsers: {

                            $sum: {

                                $cond: [

                                    {
                                        $eq: [
                                            "$subscriptionPlan",
                                            "FREE",
                                        ],
                                    },

                                    1,

                                    0,

                                ],

                            },

                        },

                        proUsers: {

                            $sum: {

                                $cond: [

                                    {
                                        $eq: [
                                            "$subscriptionPlan",
                                            "PRO",
                                        ],
                                    },

                                    1,

                                    0,

                                ],

                            },

                        },

                        blockedUsers: {

                            $sum: {

                                $cond: [

                                    "$isBlocked",

                                    1,

                                    0,

                                ],

                            },

                        },

                        googleUsers: {

                            $sum: {

                                $cond: [

                                    {

                                        $ne: [

                                            "$googleId",

                                            null,

                                        ],

                                    },

                                    1,

                                    0,

                                ],

                            },

                        },

                        emailUsers: {

                            $sum: {

                                $cond: [

                                    {

                                        $eq: [

                                            "$googleId",

                                            null,

                                        ],

                                    },

                                    1,

                                    0,

                                ],

                            },

                        },

                        newUsers: {

                            $sum: 1,

                        },

                    },

                },
                {
                    $project: {

                        _id: 0,

                        totalUsers: 1,

                        freeUsers: 1,

                        proUsers: 1,

                        blockedUsers: 1,

                        googleUsers: 1,

                        emailUsers: 1,

                        newUsers: 1,

                    },

                },]);

        return result ?? {

            totalUsers: 0,

            freeUsers: 0,

            proUsers: 0,

            blockedUsers: 0,

            googleUsers: 0,

            emailUsers: 0,

            newUsers: 0,

        };
    }

    async getRegistrationTrend(filter: AnalyticsFilterDTO): Promise<UserRegistrationTrend[]> {

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

                    registrations: {

                        $sum: 1,

                    },

                },

            },

            {
                $project: {

                    _id: 0,

                    date: "$_id",

                    registrations: 1,

                },

            },

            {
                $sort: {

                    date: 1,

                },

            },

        ]);
    }
}        