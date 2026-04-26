import { ResendOtpInputDTO, ResendOtpOutputDTO } from "../../../dtos/auth/resendOtp.auth.dto";

export interface IResendOtpUsecase {
    execute(request: ResendOtpInputDTO): Promise<ResendOtpOutputDTO>;
}