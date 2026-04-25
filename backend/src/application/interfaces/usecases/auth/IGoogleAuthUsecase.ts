import { LoginOutputDTO } from "../../../dtos/login.auth.dto";

export interface IGoogleAuthUsecase {
    execute(idToken: string): Promise<LoginOutputDTO>
}