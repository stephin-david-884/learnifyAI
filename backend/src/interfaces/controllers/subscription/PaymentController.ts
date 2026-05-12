import { Request, Response } from "express";
import { ICreatePaymentOrderUseCase } from "../../../application/interfaces/usecases/subscription/ICreatePaymentOrderUseCase";
import { IVerifyPaymentAndActivateSubscriptionUseCase } from "../../../application/interfaces/usecases/subscription/IVerifyPaymentAndActivateSubscriptionUseCase";
import { asyncHandler } from "../../http/asyncHandler";
import { sendSuccess } from "../../http/response";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { subMessages } from "../../../application/constants/messages/subMessags";

export class PaymentController {
    constructor(
        private readonly _createPaymentOrderUseCase: ICreatePaymentOrderUseCase,
        private readonly _verifyPaymentUseCase: IVerifyPaymentAndActivateSubscriptionUseCase
    ) {}

    createPaymentOrder = asyncHandler(async (req: Request, res: Response) => {

        const userId = req.user.userId;

        const { planId } = req.body;

        const result = await this._createPaymentOrderUseCase.execute({
            userId,
            planId
        });

        return sendSuccess(
            res,
            statusCode.CREATED,
            subMessages.success.PAYMENT_ORDER_CREATED,
            result
        )
    })

    verifyPaymentAndActivateSubscription = asyncHandler(async (req: Request, res: Response) => {

        const result = await this._verifyPaymentUseCase.execute({
            razorpayOrderId: req.body.razorpayOrderId,
            razorpayPaymentId: req.body.razorpayPaymentId,
            razorpaySignature: req.body.razorpaySignature,
        });

        return sendSuccess(
            res,
            statusCode.OK,
            subMessages.success.SUBSCRIPTION_ACTIVATED,
            result
        );
    })
}