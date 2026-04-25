import { User } from "../../../domain/entities/User.entity";
import { AppError } from "../../../domain/errors/AppError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { authMessages } from "../../constants/messages/authMessages";
import { LoginOutputDTO } from "../../dtos/login.auth.dto";
import { IGoogleAuthService } from "../../interfaces/services/IGoogleAuthService";
import { IHashService } from "../../interfaces/services/IHashService";
import { ITokenService } from "../../interfaces/services/ITokenService";
import { IGoogleAuthUsecase } from "../../interfaces/usecases/auth/IGoogleAuthUsecase";

export class GoogleAuth implements IGoogleAuthUsecase {
    constructor(
        private userRepository: IUserRepository,
        private googleAuthService: IGoogleAuthService,
        private tokenService: ITokenService,
        private hashService: IHashService
    ) { }

    async execute(idToken: string): Promise<LoginOutputDTO> {

        const googleData = await this.googleAuthService.verifyIdToken(idToken);

        if (!googleData.isEmailVerified) {
            throw new AppError(authMessages.error.GOOGLE_MAIL_VERIFICATION_FAILURE, statusCode.FORBIDDEN);
        }

        let user = await this.userRepository.findByEmail(googleData.email);

        if (user) {

            //Case 1: User already linked with a DIFFERENT Google account
            if (user.googleId && user.googleId !== googleData.googleId) {
                throw new AppError(
                    "Google account mismatch",
                    statusCode.FORBIDDEN
                );
            }

            //Case 2: User exists but NOT linked → link now
            if (!user.googleId) {
                user.googleId = googleData.googleId;
                await this.userRepository.save(user);
            }

            //Case 3: Already linked correctly → do nothing (login flow)

        } else {

            // 🆕 Case 4: New user → create
            user = new User({
                name: googleData.name,
                email: googleData.email,
                googleId: googleData.googleId,
            });

            user = await this.userRepository.save(user);
        }

        if (user?.isBlocked) {
            throw new AppError(authMessages.error.UNAUTHORIZED, statusCode.FORBIDDEN);
        }

        const accessToken = this.tokenService.generateAccessToken({
            userId: user.getId(),
            email: user.email,
        });

        const refreshToken = this.tokenService.generateRefreshToken({
            userId: user.getId(),
        });

        const csrfToken = this.tokenService.generateCsrfToken();

        const hashedRefreshToken = await this.hashService.hash(refreshToken);

        user.addRefreshToken(hashedRefreshToken);

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
        };
    }
}