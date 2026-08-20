import { AppError } from "../../../domain/errors/AppError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

import { statusCode } from "../../constants/enums/statusCode";
import { authMessages } from "../../constants/messages/authMessages";

import {
    ResendForgotPasswordOtpInputDTO,
    ResendForgotPasswordOtpOutputDTO,
} from "../../dtos/auth/resendForgotPasswordOtp.auth.dto";

import { IHashService } from "../../interfaces/services/IHashService";
import { IMailService } from "../../interfaces/services/IMailService";
import { IOtpService } from "../../interfaces/services/IOtpservice";
import { IOtpStore } from "../../interfaces/services/IOtpStore";

import { OtpMailPayload } from "../../interfaces/services/mail.types";
import { IResendForgotPasswordOtpUsecase } from "../../interfaces/usecases/auth/IResendForgotPasswordOtpUsecase";


export class ResendForgotPasswordOtp
    implements IResendForgotPasswordOtpUsecase {

    constructor(
        private userRepository: IUserRepository,
        private otpService: IOtpService,
        private otpStore: IOtpStore,
        private mailService: IMailService<OtpMailPayload>,
        private hashService: IHashService
    ) {}

    async execute(
        request: ResendForgotPasswordOtpInputDTO
    ): Promise<ResendForgotPasswordOtpOutputDTO> {

        const { email } = request;

        const user = await this.userRepository.findByEmail(email);

        if (!user) {

            throw new AppError(authMessages.error.USER_NOT_FOUND, statusCode.NOT_FOUND);

        }

        const otp = this.otpService.generate();

        const hashedOtp = await this.hashService.hash(otp);

        await this.otpStore.deleteOtp(email);

        await this.otpStore.saveOtp(email, hashedOtp, 120);

        await this.mailService.send({

            to: email,
            name: user.name,
            otp,

        });


        return { success: true};

    }

}