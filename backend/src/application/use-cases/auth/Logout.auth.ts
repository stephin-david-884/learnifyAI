import { AppError } from "../../../domain/errors/AppError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { authMessages } from "../../constants/messages/authMessages";
import { IHashService } from "../../interfaces/services/IHashService";
import { ITokenService } from "../../interfaces/services/ITokenService";
import { ILogoutUsecase } from "../../interfaces/usecases/auth/ILogoutUsecase";

export class Logout implements ILogoutUsecase {
    constructor(
        private useRepository: IUserRepository,
        private tokenService: ITokenService,
        private hashService: IHashService
    ) {}

    async execute(refreshToken: string): Promise<void> {
        
        if(!refreshToken) {
            throw new AppError(authMessages.error.REFRESH_TOKEN_NOT_FOUND, statusCode.NOT_FOUND);
        }

        const payload = this.tokenService.verifyRefreshToken(refreshToken);

        const userId = payload.userId;

        const user = await this.useRepository.findById(userId);

        if(!user) {
            throw new AppError(authMessages.error.USER_NOT_FOUND, statusCode.NOT_FOUND);
        }

        const storedTokens = user.getRefreshTokens();

        let tokenFound = false;

        for(const storedToken of storedTokens) {
            const isMatch = await this.hashService.compare(
                refreshToken,
                storedToken
            );

            if(isMatch) {
                user.removeRefreshToken(storedToken);
                tokenFound = true;
                break;
            }
        }

        if(!tokenFound) {
            throw new AppError(authMessages.error.REFRESH_TOKEN_NOT_FOUND, statusCode.FORBIDDEN);
        }

        await this.useRepository.save(user);
    }
}