import { AppError } from "../../../domain/errors/AppError";
import { statusCode } from "../../constants/enums/statusCode";
import { authMessages } from "../../constants/messages/authMessages";
import { ResendOtpInputDTO, ResendOtpOutputDTO } from "../../dtos/resendOtp.auth.dto";
import { IHashService } from "../../interfaces/services/IHashService";
import { IMailService } from "../../interfaces/services/IMailService";
import { IOtpService } from "../../interfaces/services/IOtpservice";
import { IOtpStore } from "../../interfaces/services/IOtpStore";
import { ITempUserStore } from "../../interfaces/services/ITempUserStore";
import { OtpMailPayload } from "../../interfaces/services/mail.types";
import { IResendOtpUsecase } from "../../interfaces/usecases/auth/IResendOtpUsecase";

export class ResendOtp implements IResendOtpUsecase {
    constructor(
        private otpService: IOtpService,
        private otpStore: IOtpStore,
        private mailService: IMailService<OtpMailPayload>,
        private hashService: IHashService,
        private tempUserStore: ITempUserStore
    ) {}

    async execute(request: ResendOtpInputDTO): Promise<ResendOtpOutputDTO> {

        const { email } = request;

        //Check the temp user
        const tempUser = await this.tempUserStore.get(email);
        if(!tempUser){
            throw new AppError(authMessages.error.REG_SESSION_EXPIRED, statusCode.BAD_REQUEST);
        }

        //Generate OTP
        const otp = this.otpService.generate();

        //Hash OTP
        const hashedOtp = await this.hashService.hash(otp);

        //Replace the old OTP
        await this.otpStore.deleteOtp(email);

        //Save new OTP
        await this.otpStore.saveOtp(email, hashedOtp, 120);

        //Send OTP
        await this.mailService.send({
            to: email,
            name: tempUser.name,
            otp
        });

        return {
            success: true
        }
    }
}