import { LoginAdminInputDTO, LoginAdminOutputDTO } from "../../../../dtos/admin/auth/login.admin.dto";

export interface IAdminLoginUsecase {
    execute(request: LoginAdminInputDTO): Promise<LoginAdminOutputDTO>
}