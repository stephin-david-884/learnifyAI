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

// refactor: clean auth controller using asyncHandler and standardized response handling

export class AuthController {
    constructor(
        private _registerUseCase: IRegisterUserUsecase,
        private _verifyRegister: IVerifyRegisterUsecase,
        private _resendOtp: IResendOtpUsecase,
        private _refreshToken: IRefreshTokenUseCase,
        private _getCurrentUser: IGetCurrentUsecase
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

        // cookies
        res.cookie("accessToken", result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });

        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.cookie("XSRF-TOKEN", result.csrfToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

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

        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        });

        res.cookie("accessToken", result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 15 * 60 * 1000,
            path: "/",
        });

        res.cookie("XSRF-TOKEN", result.csrfToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
        });

        return sendSuccess(
            res,
            statusCode.OK,
            authMessages.success.TOKEN_REFRESHED
        );
    });

    getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            throw new AppError(authMessages.error.UNAUTHORIZED, statusCode.FORBIDDEN);
        }

        const user = await this._getCurrentUser.execute(accessToken);

        return sendSuccess(
            res,
            statusCode.OK,
            "User fetched successfully",
            { user }
        );
    });
}