import { LoginInputDTO, LoginOutputDTO } from "../../../dtos/login.auth.dto";

export interface ILoginUsecase {
    execute(request: LoginInputDTO): Promise<LoginOutputDTO>
}