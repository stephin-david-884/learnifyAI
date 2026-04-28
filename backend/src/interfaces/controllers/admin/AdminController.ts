import { IAdminLoginUsecase } from "../../../application/interfaces/usecases/admin/auth/IAdminLoginUsecase";
import { cookieConfig } from "../../../config/cookie.config";
import { asyncHandler } from "../../http/asyncHandler";
import { Request, Response } from "express";
import { sendSuccess } from "../../http/response";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { authMessages } from "../../../application/constants/messages/authMessages";
import { IRefreshTokenUseCase } from "../../../application/interfaces/usecases/auth/IRefreshTokenUsecase";
import { AppError } from "../../../domain/errors/AppError";

export class AdminController {
    constructor(
        private _loginUsecase: IAdminLoginUsecase,
        private _refreshToken: IRefreshTokenUseCase
    ) { }

    login = asyncHandler(async (req: Request, res: Response) => {
        const result = await this._loginUsecase.execute(req.body);

        res.cookie("accessToken", result.accessToken, cookieConfig.accessToken);
        res.cookie("refreshToken", result.refreshToken, cookieConfig.refreshToken);
        res.cookie("XSRF-TOKEN", result.csrfToken, cookieConfig.csrfToken);

        return sendSuccess(
            res,
            statusCode.OK,
            authMessages.success.ADMIN_LOGIN_SUCCESS,
            {
                admin: result.admin
            }
        );
    });

    refreshToken = asyncHandler(async (req: Request, res: Response) => {
        const refreshTokenFromCookie = req.cookies.refreshToken;

        const result = await this._refreshToken.execute({ token: refreshTokenFromCookie });

        if (result.type !== 'ADMIN') {
            throw new AppError(authMessages.error.UNAUTHORIZED, statusCode.FORBIDDEN);
        }

        res.cookie("accessToken", result.accessToken, cookieConfig.accessToken);
        res.cookie("refreshToken", result.refreshToken, cookieConfig.refreshToken);
        res.cookie("XSRF-TOKEN", result.csrfToken, cookieConfig.csrfToken);
        return sendSuccess(
            res,
            statusCode.OK,
            authMessages.success.TOKEN_REFRESHED
        );
    })
}