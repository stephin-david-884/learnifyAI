import { Request, Response } from "express";
import { IGetProfileUseCase } from "../../../application/interfaces/usecases/profile/IGetProfileUseCase";
import { asyncHandler } from "../../http/asyncHandler";
import { sendSuccess } from "../../http/response";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { profileMessages } from "../../../application/constants/messages/profileMessages";

export class ProfileController {

    constructor(
        private readonly _getProfileUseCase: IGetProfileUseCase
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
}