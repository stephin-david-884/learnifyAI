import { Request, Response } from "express";
import { IGetCreditStatusUseCase } from "../../../application/interfaces/usecases/subscription/IGetCreditStatusUseCase";
import { asyncHandler } from "../../http/asyncHandler";
import { sendSuccess } from "../../http/response";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { subMessages } from "../../../application/constants/messages/subMessags";

export class CreditController {

    constructor(
        private readonly _getCreditStatusUseCase: IGetCreditStatusUseCase
    ) {}

    getCreditStatus = asyncHandler(async(req: Request, res: Response) => {
        const userId = req.user.userId;

        const result = await this._getCreditStatusUseCase.execute(userId);

        return sendSuccess(
            res,
            statusCode.OK,
            subMessages.success.CREDITS_FETCHED,
            result
        );
    })
}