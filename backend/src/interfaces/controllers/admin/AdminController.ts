import { IAdminLoginUsecase } from "../../../application/interfaces/usecases/admin/auth/IAdminLoginUsecase";
import { cookieConfig } from "../../../config/cookie.config";
import { asyncHandler } from "../../http/asyncHandler";
import { Request, Response } from "express";
import { sendSuccess } from "../../http/response";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { authMessages } from "../../../application/constants/messages/authMessages";
import { IRefreshTokenUseCase } from "../../../application/interfaces/usecases/auth/IRefreshTokenUsecase";
import { AppError } from "../../../domain/errors/AppError";
import { IGetCurrentAdminUsecase } from "../../../application/interfaces/usecases/admin/auth/IGetCurrentAdminUsecase";
import { ILogoutUsecase } from "../../../application/interfaces/usecases/auth/ILogoutUsecase";

export class AdminController {
    constructor(
        private _loginUsecase: IAdminLoginUsecase,
        private _refreshToken: IRefreshTokenUseCase,
        private _getCurrentAdmin: IGetCurrentAdminUsecase,
        private _logout: ILogoutUsecase
    ) { }

    login = asyncHandler(async (req: Request, res: Response) => {
        const result = await this._loginUsecase.execute(req.body);

        res.cookie("adminAccessToken", result.accessToken, cookieConfig.accessToken);
        res.cookie("adminRefreshToken", result.refreshToken, cookieConfig.refreshToken);
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
        const refreshTokenFromCookie = req.cookies.adminRefreshToken;

        const result = await this._refreshToken.execute({ token: refreshTokenFromCookie });

        if (result.type !== 'ADMIN') {
            throw new AppError(authMessages.error.UNAUTHORIZED, statusCode.FORBIDDEN);
        }

        res.cookie("adminAccessToken", result.accessToken, cookieConfig.accessToken);
        res.cookie("adminRefreshToken", result.refreshToken, cookieConfig.refreshToken);
        res.cookie("XSRF-TOKEN", result.csrfToken, cookieConfig.csrfToken);
        return sendSuccess(
            res,
            statusCode.OK,
            authMessages.success.TOKEN_REFRESHED
        );
    })

    getCurrentAdmin = asyncHandler(async (req: Request, res: Response) => {
        const accessToken = req.cookies.adminAccessToken;

        if (!accessToken) {
            throw new AppError("Unauthorized", statusCode.UNAUTHORIZED);
        }

        const admin = await this._getCurrentAdmin.execute(accessToken);

        return sendSuccess(res, statusCode.OK, "Admin fetched", { admin });
    });

    logout = asyncHandler(async (req: Request, res: Response) => {

        const refreshToken = req.cookies.adminRefreshToken;

        if (refreshToken) {
            await this._logout.execute(refreshToken);
        }

        res.clearCookie("adminAccessToken", cookieConfig.accessToken);
        res.clearCookie("adminRefreshToken", cookieConfig.refreshToken);
        res.clearCookie("XSRF-TOKEN", cookieConfig.csrfToken);

        return sendSuccess(
            res,
            statusCode.OK,
            authMessages.success.ADMIN_LOGOUT_SUCCESS
        );
    });
}