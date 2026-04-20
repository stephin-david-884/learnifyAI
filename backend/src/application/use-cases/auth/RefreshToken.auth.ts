import { AppError } from "../../../domain/errors/AppError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { authMessages } from "../../constants/messages/authMessages";
import { RefreshTokenInputDTO, RefreshTokenOutputDTO } from "../../dtos/refreshToken.auth.dto";
import { IHashService } from "../../interfaces/services/IHashService";
import { ITokenService } from "../../interfaces/services/ITokenService";
import { IRefreshTokenUseCase } from "../../interfaces/usecases/auth/IRefreshTokenUsecase";


export class RefreshToken implements IRefreshTokenUseCase {
    constructor(
        private userRepository: IUserRepository,
        private tokenService: ITokenService,
        private hashService: IHashService
    ) { }

    async execute(request: RefreshTokenInputDTO): Promise<RefreshTokenOutputDTO> {
        if (!request.token) {
            throw new AppError(authMessages.error.REFRESH_TOKEN_NOT_FOUND, statusCode.UNAUTHORIZED);
        }

        //verify the current token
        const payload = this.tokenService.verifyRefreshToken(request.token);
        const userId = payload.userId;

        if (!userId) {
            throw new AppError(authMessages.error.INVALID_REFRESH_TOKEN, statusCode.UNAUTHORIZED);
        }

        //Find the user with the ID
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new AppError(authMessages.error.USER_NOT_FOUND, statusCode.NOT_FOUND);
        }

        //Validate token against stored tokens
        const storedTokens = user.getRefreshTokens();

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
            userId: user.getId(),
            email: user.email
        });

        const newRefreshToken = this.tokenService.generateRefreshToken({
            userId: user.getId(),
        })

        const csrfToken = this.tokenService.generateCsrfToken();

        const hashedRefreshToken = await this.hashService.hash(newRefreshToken);

        updatedTokens.push(hashedRefreshToken);
        
        user.setRefreshTokens(updatedTokens);
        
        await this.userRepository.save(user);

        return {
            userId: user.getId(),
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            csrfToken
        }
    }
}