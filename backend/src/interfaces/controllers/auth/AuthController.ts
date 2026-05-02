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
import { ILogoutUsecase } from "../../../application/interfaces/usecases/auth/ILogoutUsecase";
import { cookieConfig } from "../../../config/cookie.config";
import { IGoogleAuthUsecase } from "../../../application/interfaces/usecases/auth/IGoogleAuthUsecase";
import { ILoginUsecase } from "../../../application/interfaces/usecases/auth/ILoginUsecase";
import { IForgotPasswordUsecase } from "../../../application/interfaces/usecases/auth/IForgotPasswordUsecase";
import { IVerifyForgotPasswordUsecase } from "../../../application/interfaces/usecases/auth/IVerifyForgotPasswordUsecase";
import { IResetPasswordUsecase } from "../../../application/interfaces/usecases/auth/IResetPasswordUsecase";
import { AppError } from "../../../domain/errors/AppError";


export class AuthController {
    constructor(
        private _registerUseCase: IRegisterUserUsecase,
        private _verifyRegister: IVerifyRegisterUsecase,
        private _resendOtp: IResendOtpUsecase,
        private _refreshToken: IRefreshTokenUseCase,
        private _getCurrentUser: IGetCurrentUsecase,
        private _logout: ILogoutUsecase,
        private _googleAuth: IGoogleAuthUsecase,
        private _login: ILoginUsecase,
        private _forgotPassword: IForgotPasswordUsecase,
        private _verifyForgotPassword: IVerifyForgotPasswordUsecase,
        private _resetPassword: IResetPasswordUsecase
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

        if (!refreshTokenFromCookie) {
            throw new AppError(authMessages.error.REFRESH_TOKEN_NOT_FOUND, statusCode.UNAUTHORIZED);
        }

        const result = await this._refreshToken.execute({
            token: refreshTokenFromCookie,
        });

        if (result.type !== 'USER') {
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
    });

    getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            throw new AppError(authMessages.error.UNAUTHORIZED, statusCode.UNAUTHORIZED);
        }

        const user = await this._getCurrentUser.execute(accessToken);

        if(user.isBlocked) {
            throw new AppError(authMessages.error.UNAUTHORIZED, statusCode.FORBIDDEN);
        }

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
    });

    googleLogin = asyncHandler(async (req: Request, res: Response) => {

        const { idToken } = req.body;

        const result = await this._googleAuth.execute(idToken);

        res.cookie("accessToken", result.accessToken, cookieConfig.accessToken);
        res.cookie("refreshToken", result.refreshToken, cookieConfig.refreshToken);
        res.cookie("XSRF-TOKEN", result.csrfToken, cookieConfig.csrfToken);

        return sendSuccess(
            res,
            statusCode.OK,
            authMessages.success.USER_LOGIN_SUCCESS,
            { user: result.user }
        );
    })

    login = asyncHandler(async (req: Request, res: Response) => {

        const { email, password } = req.body;
        const result = await this._login.execute({
            email,
            password,
        });

        res.cookie("accessToken", result.accessToken, cookieConfig.accessToken);
        res.cookie("refreshToken", result.refreshToken, cookieConfig.refreshToken);
        res.cookie("XSRF-TOKEN", result.csrfToken, cookieConfig.csrfToken);

        return sendSuccess(
            res,
            statusCode.OK,
            authMessages.success.USER_LOGIN_SUCCESS,
            {
                user: result.user
            }
        );
    })

    forgotPassword = asyncHandler(async (req: Request, res: Response) => {
        const { email } = req.body;

        await this._forgotPassword.execute({ email });

        return sendSuccess(
            res,
            statusCode.OK,
            authMessages.success.OTP_SEND_SUCCESS
        )
    })

    verifyForgotPasswordOtp = asyncHandler(async (req, res) => {
        const { email, otp } = req.body;

        const result = await this._verifyForgotPassword.execute({
            email,
            otp
        });

        return sendSuccess(
            res,
            statusCode.OK,
            authMessages.success.OTP_VERIFIED,
            result
        );
    });

    resetPassword = asyncHandler(async (req, res) => {
        const { email, newPassword, confirmPassword, resetToken } = req.body;

        await this._resetPassword.execute({
            email,
            newPassword,
            confirmPassword,
            resetToken
        });

        return sendSuccess(
            res,
            statusCode.OK,
            authMessages.success.PASSWORD_RESET
        );
    });
}