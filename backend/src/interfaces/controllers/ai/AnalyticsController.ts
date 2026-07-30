import { Request, Response } from "express";
import { IGetAIAnalytics } from "../../../application/interfaces/usecases/analytics/IGetAIAnalytics";
import { IGetUserAnalytics } from "../../../application/interfaces/usecases/analytics/IGetUserAnalytics";
import { IGetDocumentAnalytics } from "../../../application/interfaces/usecases/analytics/IGetDocumentAnalytics";
import { IGetRevenueAnalytics } from "../../../application/interfaces/usecases/analytics/IGetRevenueAnalytics";
import { IGetDashboardSummary } from "../../../application/interfaces/usecases/analytics/IGetDashboardSummary";
import { asyncHandler } from "../../http/asyncHandler";
import { sendSuccess } from "../../http/response";
import { mapToAnalyticsFilterDTO } from "../../../application/mappers/admin/analytics/AnalyticsMapper";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { analyticsMessages } from "../../../application/constants/messages/analyticsMessages";

export class AnalyticsController {

    constructor(

        private readonly _getAIAnalytics: IGetAIAnalytics,

        private readonly _getUserAnalytics: IGetUserAnalytics,

        private readonly _getDocumentAnalytics: IGetDocumentAnalytics,

        private readonly _getRevenueAnalytics: IGetRevenueAnalytics,

        private readonly _getDashboardSummary: IGetDashboardSummary,

    ) {}

    getAIAnalytics = asyncHandler(async (req: Request, res: Response) => {

        const filter = mapToAnalyticsFilterDTO(req);

        const analytics =
            await this._getAIAnalytics.execute(filter);

        return sendSuccess(

            res,

            statusCode.OK,

            analyticsMessages.success.AI_ANALYTICS_FETCHED,

            analytics,

        );

    });

    getUserAnalytics = asyncHandler(async (req: Request, res: Response) => {

        const filter = mapToAnalyticsFilterDTO(req);

        const analytics =
            await this._getUserAnalytics.execute(filter);

        return sendSuccess(

            res,

            statusCode.OK,

            analyticsMessages.success.USER_ANALYTICS_FETCHED,

            analytics,

        );

    });

    getDocumentAnalytics = asyncHandler(async (req: Request, res: Response) => {

        const filter = mapToAnalyticsFilterDTO(req);

        const analytics =
            await this._getDocumentAnalytics.execute(filter);

        return sendSuccess(

            res,

            statusCode.OK,

            analyticsMessages.success.DOCUMENT_ANALYTICS_FETCHED,

            analytics,

        );

    });

    getRevenueAnalytics = asyncHandler(async (req: Request, res: Response) => {

        const filter = mapToAnalyticsFilterDTO(req);

        const analytics =
            await this._getRevenueAnalytics.execute(filter);

        return sendSuccess(

            res,

            statusCode.OK,

            analyticsMessages.success.REVENUE_ANALYTICS_FETCHED,

            analytics,

        );

    });

    getDashboardSummary = asyncHandler(async (req: Request, res: Response) => {

        const filter = mapToAnalyticsFilterDTO(req);

        const dashboard =
            await this._getDashboardSummary.execute(filter);

        return sendSuccess(

            res,

            statusCode.OK,

            analyticsMessages.success.DASHBOARD_FETCHED,

            dashboard,

        );

    });

}