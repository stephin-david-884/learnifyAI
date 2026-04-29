import { AppError } from "../../../domain/errors/AppError";
import { IAuthEntity } from "../../../domain/interfaces/IAuthEntity";
import { IBaseRepository } from "../../../domain/repositories/IBaseRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { authMessages } from "../../constants/messages/authMessages";
import { IHashService } from "../../interfaces/services/IHashService";
import { ITokenService } from "../../interfaces/services/ITokenService";
import { ILogoutUsecase } from "../../interfaces/usecases/auth/ILogoutUsecase";

export class Logout<T extends IAuthEntity> implements ILogoutUsecase {
    constructor(
        private repository: IBaseRepository<T>,
        private tokenservice: ITokenService,
        private hashService: IHashService
    ) { }

    async execute(refreshToken: string): Promise<void> {
        if (!refreshToken) {
            throw new AppError(
                authMessages.error.REFRESH_TOKEN_NOT_FOUND,
                statusCode.NOT_FOUND
            );
        }

        const payload = this.tokenservice.verifyRefreshToken(refreshToken);
        const entityId = payload.userId;

        const entity = await this.repository.findById(entityId);

        if (!entity) {
            throw new AppError(
                authMessages.error.ENTITY_NOT_FOUND,
                statusCode.NOT_FOUND
            );
        }

        const storedTokens = entity.getRefreshTokens();

        let tokenFound = false;

        for (const storedToken of storedTokens) {
            const isMatch = await this.hashService.compare(
                refreshToken,
                storedToken
            );

            if (isMatch) {
                entity.removeRefreshToken(storedToken);
                tokenFound = true;
                break;
            }
        }

        if (!tokenFound) {
            throw new AppError(
                authMessages.error.REFRESH_TOKEN_NOT_FOUND,
                statusCode.FORBIDDEN
            );
        }

        await this.repository.save(entity);
    }
}