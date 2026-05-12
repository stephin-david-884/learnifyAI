import { Request, Response } from "express";
import { IGetActiveSubscriptionUseCase } from "../../../application/interfaces/usecases/subscription/IGetActiveSubscriptionUseCase";
import { IGetAvailablePlansUseCase } from "../../../application/interfaces/usecases/subscription/IGetAvailablePlansUseCase";
import { IGetUserPaymentsUseCase } from "../../../application/interfaces/usecases/subscription/IGetUserPaymentsUseCase";
import { asyncHandler } from "../../http/asyncHandler";
import { sendSuccess } from "../../http/response";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { subMessages } from "../../../application/constants/messages/subMessags";

export class SubscriptionController {

    constructor(
        private readonly _getAvailablePlansUseCase: IGetAvailablePlansUseCase,
        private readonly _getActiveSubscriptionUseCase: IGetActiveSubscriptionUseCase,
        private readonly _getUserPaymentsUseCase: IGetUserPaymentsUseCase
    ) { }

    getAvailablePlans = asyncHandler(async(req: Request, res: Response) => {
        const plans = await this._getAvailablePlansUseCase.execute();

        return sendSuccess(
            res,
            statusCode.OK,
            subMessages.success.AVAILABLE_PLANS_FETCHED,
            plans
        );
    });

    getActiveSubscription = asyncHandler(async(req: Request, res: Response) => {
        const userId = req.user.userId;

        const subscription = await this._getActiveSubscriptionUseCase.execute(userId);

        return sendSuccess(
            res,
            statusCode.OK,
            subMessages.success.ACTIVE_SUBSCRIPTION_FETCHED,
            subscription
        );
    });

    getUserPayments = asyncHandler(async(req: Request, res: Response) => {
        const userId = req.user.userId;

        const payments = await this._getUserPaymentsUseCase.execute(userId);

        return sendSuccess(
            res,
            statusCode.OK,
            subMessages.success.USER_PAYMENTS_FETCHED,
            payments
        )
    })
}