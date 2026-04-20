import { VerifyRegisterInputDTO, VerifyRegisterOutputDTO } from "../../../dtos/verifyRegister.auth.dto";


export interface IVerifyRegisterUsecase {
    execute(data: VerifyRegisterInputDTO): Promise<VerifyRegisterOutputDTO>;
}