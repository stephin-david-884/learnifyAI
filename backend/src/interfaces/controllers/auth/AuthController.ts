import { NextFunction, Request, Response } from "express";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { authMessages } from "../../../application/constants/messages/authMessages";
import { RegisterUser } from "../../../application/use-cases/auth/RegisterUser.auth";
import { VerifyRegister } from "../../../application/use-cases/auth/VerifyRegister";
import { otpSchema, registerSchema } from "../../validators/auth/registerValidator";
import { RegisterInputDTO } from "../../../application/dtos/register.auth.dto";
import { success } from "zod";
import { VerifyRegisterInputDTO } from "../../../application/dtos/verifyRegister.auth.dto";

export class AuthController {
    constructor(
        private _registerUseCase: RegisterUser,
        private _verifyRegister: VerifyRegister,
    ) { }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = registerSchema.safeParse(req.body);

            if (!parsed.success) {
                return res.status(statusCode.BAD_REQUEST).json({
                    success: false,
                    message: parsed.error.issues[0].message,
                });
            }

            const payload : RegisterInputDTO = {
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

            if(!parsed.success) {
                return res.status(statusCode.BAD_REQUEST).json({
                    success: false,
                    message: parsed.error.issues[0].message,
                });
            }

            const payload: VerifyRegisterInputDTO = {
                email: parsed.data.email,
                otp: parsed.data.otp
            };

            const result = await this._verifyRegister.execute(payload);

            return res.status(statusCode.CREATED).json({
                
                message: authMessages.success.REGISTER_SUCCESS,
                ...result,
            });
        } catch (error) {
            next(error);
        }
    }
}