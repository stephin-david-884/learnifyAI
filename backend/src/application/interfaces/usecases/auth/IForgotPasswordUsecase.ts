import { ForgotPasswordInputDTO, ForgotPasswordOutputDTO } from "../../../dtos/auth/forgotPassword.auth.dto";

export interface IForgotPasswordUsecase {
    execute(request: ForgotPasswordInputDTO): Promise<ForgotPasswordOutputDTO>
}