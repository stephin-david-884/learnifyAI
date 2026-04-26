import { AppError } from "../../../domain/errors/AppError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { authMessages } from "../../constants/messages/authMessages";
import { ResetPasswordInputDTO, ResetPasswordOutputDTO } from "../../dtos/auth/resetPassword.auth.dto";
import { IHashService } from "../../interfaces/services/IHashService";
import { ITokenService } from "../../interfaces/services/ITokenService";
import { IResetPasswordUsecase } from "../../interfaces/usecases/auth/IResetPasswordUsecase";

export class ResetPassword implements IResetPasswordUsecase {
    constructor(
        private userRepository: IUserRepository,
        private hashService: IHashService,
        private tokenService: ITokenService
    ) { }

    async execute(request: ResetPasswordInputDTO): Promise<ResetPasswordOutputDTO> {

        const { email, newPassword, confirmPassword, resetToken } = request;

        if (newPassword !== confirmPassword) {
            throw new AppError(
                authMessages.error.PASSWORDS_DO_NOT_MATCH,
                statusCode.BAD_REQUEST
            );
        }

        const decoded = this.tokenService.verifyResetTokenForForgotPassword(resetToken);

        if (decoded.email !== email) {
            throw new AppError(
                authMessages.error.TOKEN_EMAIL_MISMATCH,
                statusCode.BAD_REQUEST
            );
        }

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError(
                authMessages.error.USER_NOT_FOUND,
                statusCode.NOT_FOUND
            );
        }

        const hashedPassword = await this.hashService.hash(newPassword);

        user.setPassword(hashedPassword);

        const tokens = user.getRefreshTokens();
        for (const token of tokens) {
            user.removeRefreshToken(token);
        }

        await this.userRepository.save(user);

        return {
            success: true
        }
    }
}