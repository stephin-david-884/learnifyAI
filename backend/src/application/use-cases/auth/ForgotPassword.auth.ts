import { AppError } from "../../../domain/errors/AppError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { authMessages } from "../../constants/messages/authMessages";
import { ForgotPasswordInputDTO, ForgotPasswordOutputDTO } from "../../dtos/auth/forgotPassword.auth.dto";
import { IHashService } from "../../interfaces/services/IHashService";
import { IMailService } from "../../interfaces/services/IMailService";
import { IOtpService } from "../../interfaces/services/IOtpservice";
import { IOtpStore } from "../../interfaces/services/IOtpStore";
import { OtpMailPayload } from "../../interfaces/services/mail.types";
import { IForgotPasswordUsecase } from "../../interfaces/usecases/auth/IForgotPasswordUsecase";

export class ForgotPassword implements IForgotPasswordUsecase {
    constructor(
        private userRepository: IUserRepository,
        private otpService: IOtpService,
        private otpStore: IOtpStore,
        private mailService: IMailService<OtpMailPayload>,
        private hashService: IHashService
    ) {}

    async execute(request: ForgotPasswordInputDTO): Promise<ForgotPasswordOutputDTO> {
        const { email } = request;

        const user = await this.userRepository.findByEmail(email);
        if(!user) {
            throw new AppError(
                authMessages.error.USER_NOT_FOUND,
                statusCode.NOT_FOUND
            );
        }

        const otp = this.otpService.generate();

        const hashedOtp = await this.hashService.hash(otp);

        await this.otpStore.saveOtp(email, hashedOtp, 120);

        await this.mailService.send({
            to:email,
            name: user.name,
            otp
        });

        return {
            success: true
        };
    }
}