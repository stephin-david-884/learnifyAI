import { ResendForgotPasswordOtpInputDTO, ResendForgotPasswordOtpOutputDTO } from "../../../dtos/auth/resendForgotPasswordOtp.auth.dto";

export interface IResendForgotPasswordOtpUsecase {

    execute( request: ResendForgotPasswordOtpInputDTO ): Promise<ResendForgotPasswordOtpOutputDTO>;
}