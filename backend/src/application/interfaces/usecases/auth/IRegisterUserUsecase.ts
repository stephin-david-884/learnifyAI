import { RegisterInputDTO, RegisterOutputDTO } from "../../../dtos/register.auth.dto";

export interface IRegisterUserUsecase {
    execute(input: RegisterInputDTO): Promise<RegisterOutputDTO>;
}