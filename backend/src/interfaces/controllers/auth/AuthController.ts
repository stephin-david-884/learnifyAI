import { Request, Response } from "express";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { authMessages } from "../../../application/constants/messages/authMessages";
import { IRegisterUserUsecase } from "../../../application/interfaces/usecases/auth/IRegisterUserUsecase";
import { IVerifyRegisterUsecase } from "../../../application/interfaces/usecases/auth/IVerifyRegisterUsecase";
import { IResendOtpUsecase } from "../../../application/interfaces/usecases/auth/IResendOtpUsecase";
import { IRefreshTokenUseCase } from "../../../application/interfaces/usecases/auth/IRefreshTokenUsecase";
import { IGetCurrentUsecase } from "../../../application/interfaces/usecases/auth/IGetCurrentUsecase";
import { asyncHandler } from "../../http/asyncHandler";
import { sendSuccess } from "../../http/response";
import { AppError } from "../../../domain/errors/AppError";
import { ILogoutUsecase } from "../../../application/interfaces/usecases/auth/ILogoutUsecase";
import { env } from "../../../config/env";
import { cookieConfig } from "../../../config/cookie.config";


export class AuthController {
    constructor(
        private _registerUseCase: IRegisterUserUsecase,
        private _verifyRegister: IVerifyRegisterUsecase,
        private _resendOtp: IResendOtpUsecase,
        private _refreshToken: IRefreshTokenUseCase,
        private _getCurrentUser: IGetCurrentUsecase,
        private _logout: ILogoutUsecase
    ) { }

    register = asyncHandler(async (req: Request, res: Response) => {
        const payload = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };

        await this._registerUseCase.execute(payload);

        return sendSuccess(
            res,
            statusCode.OK,
            authMessages.success.OTP_SEND_SUCCESS
        );
    });

    verifyOtp = asyncHandler(async (req: Request, res: Response) => {
        const { email, otp } = req.body;

        const result = await this._verifyRegister.execute({
            email,
            otp,
        });

        res.cookie("accessToken", result.accessToken, cookieConfig.accessToken);

        res.cookie("refreshToken", result.refreshToken, cookieConfig.refreshToken);

        res.cookie("XSRF-TOKEN", result.csrfToken, cookieConfig.csrfToken);

        return sendSuccess(
            res,
            statusCode.CREATED,
            authMessages.success.REGISTER_SUCCESS,
            { user: result.user }
        );
    });


    resendOtp = asyncHandler(async (req: Request, res: Response) => {
        const { email } = req.body;

        await this._resendOtp.execute({ email });

        return sendSuccess(
            res,
            statusCode.OK,
            authMessages.success.OTP_SEND_SUCCESS
        );
    });

    refreshToken = asyncHandler(async (req: Request, res: Response) => {
        const refreshTokenFromCookie = req.cookies.refreshToken;

        const result = await this._refreshToken.execute({
            token: refreshTokenFromCookie,
        });

        res.cookie("accessToken", result.accessToken, cookieConfig.accessToken);
        res.cookie("refreshToken", result.refreshToken, cookieConfig.refreshToken);
        res.cookie("XSRF-TOKEN", result.csrfToken, cookieConfig.csrfToken);

        return sendSuccess(
            res,
            statusCode.OK,
            authMessages.success.TOKEN_REFRESHED
        );
    });

    getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            return sendSuccess(
                res,
                statusCode.OK,
                authMessages.error.USER_NOT_FOUND,
                { user: null }
            )
        }

        const user = await this._getCurrentUser.execute(accessToken);

        return sendSuccess(
            res,
            statusCode.OK,
            "User fetched successfully",
            { user }
        );
    });

    logout = asyncHandler(async (req: Request, res: Response) => {

        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            await this._logout.execute(refreshToken);
        }

        res.clearCookie("accessToken", cookieConfig.accessToken);
        res.clearCookie("refreshToken", cookieConfig.refreshToken);
        res.clearCookie("XSRF-TOKEN", cookieConfig.csrfToken);

        return sendSuccess(
            res,
            statusCode.OK,
            authMessages.success.USER_LOGGEDOUT_SUCCESS
        );
    })
}