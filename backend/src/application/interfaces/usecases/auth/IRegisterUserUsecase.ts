import { RegisterInputDTO, RegisterOutputDTO } from "../../../dtos/auth/register.auth.dto";

export interface IRegisterUserUsecase {
    execute(input: RegisterInputDTO): Promise<RegisterOutputDTO>;
}