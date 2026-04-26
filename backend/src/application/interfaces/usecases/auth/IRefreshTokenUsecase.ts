import { RefreshTokenInputDTO, RefreshTokenOutputDTO } from "../../../dtos/auth/refreshToken.auth.dto";

export interface IRefreshTokenUseCase {
    execute(input: RefreshTokenInputDTO): Promise<RefreshTokenOutputDTO>;
}