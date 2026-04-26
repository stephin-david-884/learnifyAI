import { AppError } from "../../../domain/errors/AppError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { authMessages } from "../../constants/messages/authMessages";
import { LoginInputDTO, LoginOutputDTO } from "../../dtos/auth/login.auth.dto";
import { IHashService } from "../../interfaces/services/IHashService";
import { ITokenService } from "../../interfaces/services/ITokenService";
import { ILoginUsecase } from "../../interfaces/usecases/auth/ILoginUsecase";

export class LoginUser implements ILoginUsecase {
    constructor(
        private userRepository: IUserRepository,
        private tokenService: ITokenService,
        private hashService: IHashService,
    ) { }

    async execute(request: LoginInputDTO): Promise<LoginOutputDTO> {

        const user = await this.userRepository.findByEmail(request.email)

        if (!user) {
            throw new AppError(authMessages.error.USER_NOT_FOUND, statusCode.NOT_FOUND);
        }

        if (user.isBlocked) {
            throw new AppError(authMessages.error.UNAUTHORIZED, statusCode.FORBIDDEN);
        }

        const password = user.getPassword();

        if (!password) {
            throw new AppError(authMessages.error.USE_GOOGLE_LOGIN, statusCode.BAD_REQUEST);
        }

        const isValidPassword = await this.hashService.compare(request.password, password);

        if (!isValidPassword) {
            throw new AppError(authMessages.error.INVALID_PASSWORD, statusCode.BAD_REQUEST);
        }

        const accessToken = this.tokenService.generateAccessToken({
            userId: user.getId(),
            email: user.email,
        });

        const refreshToken = this.tokenService.generateRefreshToken({
            userId: user.getId()
        });

        const csrfToken = this.tokenService.generateCsrfToken();

        user.addRefreshToken(refreshToken);

        await this.userRepository.save(user);

        return {
            success: true,
            accessToken,
            refreshToken,
            csrfToken,
            user: {
                id: user.getId(),
                name: user.name,
                email: user.email,
                subscriptionPlan: user.subscriptionPlan,
                credits: user.credits,
            },
        }
    }
}