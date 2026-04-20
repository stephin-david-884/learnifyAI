import { NextFunction, Request, Response } from "express";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { authMessages } from "../../../application/constants/messages/authMessages";
import { RegisterBody, ResendOtpBody, VerifyOtpBody } from "../../validators/auth/registerValidator";
import { IRegisterUserUsecase } from "../../../application/interfaces/usecases/auth/IRegisterUserUsecase";
import { IVerifyRegisterUsecase } from "../../../application/interfaces/usecases/auth/IVerifyRegisterUsecase";
import { IResendOtpUsecase } from "../../../application/interfaces/usecases/auth/IResendOtpUsecase";
import { IRefreshTokenUseCase } from "../../../application/interfaces/usecases/auth/IRefreshTokenUsecase";
import { IGetCurrentUsecase } from "../../../application/interfaces/usecases/auth/IGetCurrentUsecase";

export class AuthController {
    constructor(
        private _registerUseCase: IRegisterUserUsecase,
        private _verifyRegister: IVerifyRegisterUsecase,
        private _resendOtp: IResendOtpUsecase,
        private _refreshToken: IRefreshTokenUseCase,
        private _getCurrentUser: IGetCurrentUsecase
    ) { }

    register = async (req: Request<Record<string, never>, Record<string, never>, RegisterBody>, res: Response, next: NextFunction) => {
        try {
            const payload = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            };

            await this._registerUseCase.execute(payload);

            return res.status(statusCode.OK).json({
                success: true,
                message: authMessages.success.OTP_SEND_SUCCESS
            });
        } catch (error) {
            next(error);
        }
    }

    VerifyOtp = async (req: Request<Record<string, never>, Record<string, never>, VerifyOtpBody>, res: Response, next: NextFunction) => {
        try {
            
            const payload = {
                email: req.body.email,
                otp: req.body.otp
            };

            const result = await this._verifyRegister.execute(payload);

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
                sameSite: "lax"
            })

            return res.status(statusCode.CREATED).json({

                message: authMessages.success.REGISTER_SUCCESS,
                user: result.user,
            });
        } catch (error) {
            next(error);
        }
    }

    resendOtp = async (req: Request<Record<string, never>, Record<string, never>, ResendOtpBody>, res: Response, next: NextFunction) => {
        try {
            const payload = {
                email: req.body.email,
            }

            await this._resendOtp.execute(payload);

            return res.status(statusCode.OK).json({
                success: true,
                message: authMessages.success.OTP_SEND_SUCCESS
            })
        } catch (error) {
            next(error)
        }
    }

    refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const refreshTokenFromCookie = req.cookies.refreshToken;

            const result = await this._refreshToken.execute({ token: refreshTokenFromCookie });

            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/'
            })

            res.cookie('accessToken', result.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 15 * 60 * 1000,
                path: '/'
            })

            res.cookie("XSRF-TOKEN", result.csrfToken, {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                path: '/'
            })

            return res.status(statusCode.OK).json({
                success: true,
                message: authMessages.success.TOKEN_REFRESHED,
            });
        } catch (error) {
            next(error);
        }
    }

    getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accessToken = req.cookies.accessToken;

            if (!accessToken) {
                return res.status(401).json({
                    success: false,
                    message: "Not authenticated",
                });
            }

            const user = await this._getCurrentUser.execute(accessToken);

            return res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            next(error);
        }
    };
}