import { VerifyRegisterInputDTO, VerifyRegisterOutputDTO } from "../../../dtos/auth/verifyRegister.auth.dto";


export interface IVerifyRegisterUsecase {
    execute(data: VerifyRegisterInputDTO): Promise<VerifyRegisterOutputDTO>;
}