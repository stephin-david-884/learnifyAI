import { LoginOutputDTO } from "../../../dtos/auth/login.auth.dto";

export interface IGoogleAuthUsecase {
    execute(idToken: string): Promise<LoginOutputDTO>
}