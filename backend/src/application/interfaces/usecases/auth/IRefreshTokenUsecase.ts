import { RefreshTokenInputDTO, RefreshTokenOutputDTO } from "../../../dtos/refreshToken.auth.dto";

export interface IRefreshTokenUseCase {
    execute(input: RefreshTokenInputDTO): Promise<RefreshTokenOutputDTO>;
}