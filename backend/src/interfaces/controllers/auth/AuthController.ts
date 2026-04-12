import { NextFunction, Request, Response } from "express";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { authMessages } from "../../../application/constants/messages/authMessages";
import { RegisterUser } from "../../../application/use-cases/auth/RegisterUser.auth";
import { VerifyRegister } from "../../../application/use-cases/auth/VerifyRegister";
import { otpSchema, registerSchema, resendOtpSchema } from "../../validators/auth/registerValidator";
import { RegisterInputDTO } from "../../../application/dtos/register.auth.dto";
import { VerifyRegisterInputDTO } from "../../../application/dtos/verifyRegister.auth.dto";
import { AppError } from "../../../domain/errors/AppError";
import { ResendOtpInputDTO } from "../../../application/dtos/resendOtp.auth.dto";
import { ResendOtp } from "../../../application/use-cases/auth/resendOtp.auth";
import { success } from "zod";

export class AuthController {
    constructor(
        private _registerUseCase: RegisterUser,
        private _verifyRegister: VerifyRegister,
        private _resendOtp: ResendOtp
    ) { }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = registerSchema.safeParse(req.body);

            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0].message, statusCode.BAD_REQUEST);
            }

            const payload: RegisterInputDTO = {
                name: parsed.data.name,
                email: parsed.data.email,
                password: parsed.data.password,
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

    VerifyOtp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = otpSchema.safeParse(req.body);

            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0].message, statusCode.BAD_REQUEST);
            }

            const payload: VerifyRegisterInputDTO = {
                email: parsed.data.email,
                otp: parsed.data.otp
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

    resendOtp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = resendOtpSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(
                    parsed.error.issues[0].message,
                    statusCode.BAD_REQUEST
                );
            }
            const payload: ResendOtpInputDTO = {
                email: parsed.data.email
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
}