import { AppError } from "../../../domain/errors/AppError";
import { IAdminRepository } from "../../../domain/repositories/IAdminRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { authMessages } from "../../constants/messages/authMessages";
import { RefreshTokenInputDTO, RefreshTokenOutputDTO } from "../../dtos/auth/refreshToken.auth.dto";
import { IHashService } from "../../interfaces/services/IHashService";
import { ITokenService } from "../../interfaces/services/ITokenService";
import { IRefreshTokenUseCase } from "../../interfaces/usecases/auth/IRefreshTokenUsecase";


export class RefreshToken implements IRefreshTokenUseCase {
    constructor(
        private userRepository: IUserRepository,
        private adminRepository: IAdminRepository,
        private tokenService: ITokenService,
        private hashService: IHashService
    ) { }

    async execute(request: RefreshTokenInputDTO): Promise<RefreshTokenOutputDTO> {
        if (!request.token) {
            throw new AppError(authMessages.error.REFRESH_TOKEN_NOT_FOUND, statusCode.UNAUTHORIZED);
        }

        //verify the current token
        const payload = this.tokenService.verifyRefreshToken(request.token);
        const { userId, type } = payload;

        if (!userId) {
            throw new AppError(authMessages.error.INVALID_REFRESH_TOKEN, statusCode.UNAUTHORIZED);
        }

        //Find the entity with the ID for admin or user
        let entity;

        if (type === "USER") {
            entity = await this.userRepository.findById(userId);
        } else if (type === "ADMIN") {
            entity = await this.adminRepository.findById(userId);
        } else {
            throw new AppError(
                authMessages.error.INVALID_REFRESH_TOKEN,
                statusCode.UNAUTHORIZED
            );
        }

        if (!entity) {
            throw new AppError(authMessages.error.USER_NOT_FOUND, statusCode.NOT_FOUND);
        }

        //Validate token against stored tokens
        const storedTokens = entity.getRefreshTokens();

        let matched = false;
        const updatedTokens: string[] = [];

        for (const hashedToken of storedTokens) {
            const isMatch = await this.hashService.compare(
                request.token,
                hashedToken
            );

            if (isMatch) {
                matched = true;
                continue;
            }

            updatedTokens.push(hashedToken);
        }

        if (!matched) {
            throw new AppError(
                authMessages.error.INVALID_REFRESH_TOKEN,
                statusCode.UNAUTHORIZED
            );
        }

        //Generate new tokens
        const newAccessToken = this.tokenService.generateAccessToken({
            userId: entity.getId(),
            email: entity.email,
            type,
        });

        const newRefreshToken = this.tokenService.generateRefreshToken({
            userId: entity.getId(),
            type,
        })

        const csrfToken = this.tokenService.generateCsrfToken();

        const hashedRefreshToken = await this.hashService.hash(newRefreshToken);

        updatedTokens.push(hashedRefreshToken);

        entity.setRefreshTokens(updatedTokens);

        await this.saveEntity(entity, type)

        return {
            userId: entity.getId(),
            type,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            csrfToken
        }
    }

    private async saveEntity(entity: any, type: string) {
        if (type === "USER") {
            await this.userRepository.save(entity);
        } else if (type === "ADMIN") {
            await this.adminRepository.save(entity);
        }
    }
}