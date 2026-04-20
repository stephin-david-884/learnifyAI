import { ResendOtpInputDTO, ResendOtpOutputDTO } from "../../../dtos/resendOtp.auth.dto";

export interface IResendOtpUsecase {
    execute(request: ResendOtpInputDTO): Promise<ResendOtpOutputDTO>;
}