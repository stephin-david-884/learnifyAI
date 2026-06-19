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

export class ProfileController {

    constructor(
        private readonly _getProfileUseCase: IGetProfileUseCase,
        private readonly _updateProfileUseCase: IUpdateProfileUseCase,
        private readonly _changePasswordUseCase: IChangePasswordUseCase,
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
}