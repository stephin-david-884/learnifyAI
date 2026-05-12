import { Request, Response } from "express";
import { ICreateSubscriptionPlanUseCase } from "../../../application/interfaces/usecases/subscription/ICreateSubscriptionPlanUseCase";
import { IDeactivateSubscriptionPlanUseCase } from "../../../application/interfaces/usecases/subscription/IDeactivateSubscriptionPlanUseCase";
import { IUpdateSubscriptionPlanUseCase } from "../../../application/interfaces/usecases/subscription/IUpdateSubscriptionPlanUseCase";
import { asyncHandler } from "../../http/asyncHandler";
import { sendSuccess } from "../../http/response";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { subMessages } from "../../../application/constants/messages/subMessags";

export class AdminSubscriptionController {

    constructor(
        private readonly _createSubscriptionPlanUseCase: ICreateSubscriptionPlanUseCase,
        private readonly _updateSubscriptionPlanUseCase: IUpdateSubscriptionPlanUseCase,
        private readonly _deactivateSubscriptionPlanUseCase: IDeactivateSubscriptionPlanUseCase,
    ) { }

    createSubscriptionPlan = asyncHandler(async (req: Request, res: Response) => {
        const plan = await this._createSubscriptionPlanUseCase.execute({
            name: req.body.name,
            price: req.body.price,
            creditsPerMonth: req.body.creditsPerMonth,
            discount: req.body.discount,

            features: req.body.features,

            billingCycle: req.body.billingCycle,

            durationInDays: req.body.durationInDays,

            creditResetIntervalInDays:
                req.body.creditResetIntervalInDays,
        });

        return sendSuccess(
            res,
            statusCode.CREATED,
            subMessages.success.SUBSCRIPTION_PLAN_CREATED,
            plan
        );
    })

    updateSubscriptionPlan = asyncHandler(async (req: Request, res: Response) => {

        const updatedPlan = await this._updateSubscriptionPlanUseCase.execute({
            name: req.body.name,
            price: req.body.price,
            creditsPerMonth: req.body.creditsPerMonth,
            discount: req.body.discount,

            features: req.body.features,

            billingCycle: req.body.billingCycle,

            durationInDays: req.body.durationInDays,

            creditResetIntervalInDays:
                req.body.creditResetIntervalInDays,
        })


        return sendSuccess(
            res,
            statusCode.OK,
            subMessages.success.SUBSCRIPTION_PLAN_UPDATED,
            updatedPlan
        );
    })

    deactivateSubscriptionPlan = asyncHandler(async (req: Request, res: Response) => {
        const plan =
            await this._deactivateSubscriptionPlanUseCase.execute({
                planId: req.params.planId as string,
            });

        return sendSuccess(
            res,
            statusCode.OK,
            subMessages.success.SUBSCRIPTION_PLAN_DEACTIVATED,
            plan
        );
    })
}