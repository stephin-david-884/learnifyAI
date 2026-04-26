import { ResetPasswordInputDTO, ResetPasswordOutputDTO } from "../../../dtos/auth/resetPassword.auth.dto";

export interface IResetPasswordUsecase {
    execute(request: ResetPasswordInputDTO): Promise<ResetPasswordOutputDTO>
}