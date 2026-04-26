import { AppError } from "../../../domain/errors/AppError";
import { statusCode } from "../../constants/enums/statusCode";
import { authMessages } from "../../constants/messages/authMessages";
import { VerifyForgotPasswordOtpInputDTO, VerifyForgotPasswordOtpOutputDTO } from "../../dtos/auth/verifyForgotpassword.auth.dto";
import { IHashService } from "../../interfaces/services/IHashService";
import { IOtpStore } from "../../interfaces/services/IOtpStore";
import { ITokenService } from "../../interfaces/services/ITokenService";
import { IVerifyForgotPasswordUsecase } from "../../interfaces/usecases/auth/IVerifyForgotPasswordUsecase";

export class VerifyForgotPasswordOtp implements IVerifyForgotPasswordUsecase {
    constructor(
        private otpStore: IOtpStore,
        private hashService: IHashService,
        private tokenService: ITokenService
    ) { }

    async execute(request: VerifyForgotPasswordOtpInputDTO): Promise<VerifyForgotPasswordOtpOutputDTO> {
        const { email, otp } = request;

        const storedOtp = await this.otpStore.getOtp(email);

        if (!storedOtp) {
            throw new AppError(
                authMessages.error.OTP_EXPIRED,
                statusCode.BAD_REQUEST
            );
        }

        const isValid = await this.hashService.compare(otp, storedOtp);

        if (!isValid) {
            throw new AppError(
                authMessages.error.INVALID_OTP,
                statusCode.BAD_REQUEST
            );
        }

        await this.otpStore.deleteOtp(email);

        const resetToken = this.tokenService.generateResetTokenForForgotPassword(email);

        return {
            email,
            resetToken
        };
    }
}