import { VerifyForgotPasswordOtpInputDTO, VerifyForgotPasswordOtpOutputDTO } from "../../../dtos/auth/verifyForgotpassword.auth.dto";

export interface IVerifyForgotPasswordUsecase {
    execute(request: VerifyForgotPasswordOtpInputDTO): Promise<VerifyForgotPasswordOtpOutputDTO>
}