import { Request, Response } from "express";
import { IGetProfileUseCase } from "../../../application/interfaces/usecases/profile/IGetProfileUseCase";
import { asyncHandler } from "../../http/asyncHandler";
import { sendSuccess } from "../../http/response";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { profileMessages } from "../../../application/constants/messages/profileMessages";
import { IUpdateProfileUseCase } from "../../../application/interfaces/usecases/profile/IUpdateProfileUseCase";
import { mapUpdateProfileRequest } from "../../../application/mappers/profile/mapUpdateProfileRequestDTO";
import { IChangePasswordUseCase } from "../../../application/interfaces/usecases/profile/IChangePasswordUseCase";
import { mapChangePasswordRequest } from "../../../application/mappers/profile/mapChangePasswordRequestDTO";
import { ICancelSubscriptionUseCase } from "../../../application/interfaces/usecases/subscription/ICancelSubscriptionUseCase";
import { mapCancelSubscriptionRequest } from "../../../application/mappers/profile/mapCancelSubscriptionRequestDTO";
import { subMessages } from "../../../application/constants/messages/subMessags";

export class ProfileController {

    constructor(
        private readonly _getProfileUseCase: IGetProfileUseCase,
        private readonly _updateProfileUseCase: IUpdateProfileUseCase,
        private readonly _changePasswordUseCase: IChangePasswordUseCase,
        private readonly _cancelSubscriptionUseCase: ICancelSubscriptionUseCase,
    ) {}

    getProfile = asyncHandler(async(req: Request, res: Response) => {

        const profile = await this._getProfileUseCase.execute(req.user.userId);

        return sendSuccess(
            res,
            statusCode.OK,
            profileMessages.success.PROFILE_FETCHED,
            profile
        );
    })

    updateProfile = asyncHandler(async(req: Request, res: Response) => {

        const dto = mapUpdateProfileRequest(req.user.userId, req.body);

        const profile = await this._updateProfileUseCase.execute(dto);

        return sendSuccess(
            res,
            statusCode.OK,
            profileMessages.success.PROFILE_UPDATED,
            profile
        );
    })

    changePassword = asyncHandler(async(req: Request, res: Response) => {

        const dto = mapChangePasswordRequest(req.user.userId, req.body);

        await this._changePasswordUseCase.execute(dto);

        return sendSuccess(
            res,
            statusCode.OK,
            profileMessages.success.PASSWORD_CHANGED
        )
    })

    cancelSubscripiton = asyncHandler(async(req: Request, res: Response) => {

        const dto = mapCancelSubscriptionRequest(req.user.userId);

        await this._cancelSubscriptionUseCase.execute(dto);

        return sendSuccess(
            res,
            statusCode.OK,
            subMessages.success.SUBSCRIPTION_PLAN_DEACTIVATED
        )
    })
}