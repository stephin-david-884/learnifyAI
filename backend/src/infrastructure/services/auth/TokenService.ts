import jwt from 'jsonwebtoken';
import { AccessTokenPayload, ITokenService, RefreshTokenPayload, ResetTokenPayload } from '../../../application/interfaces/services/ITokenService';
import { jwtConfig } from '../../config/jwt.config';
import { AppError } from '../../../domain/errors/AppError';
import { authMessages } from '../../../application/constants/messages/authMessages';
import { statusCode } from '../../../application/constants/enums/statusCode';
import crypto from "crypto";

export class TokenService implements ITokenService {
    generateAccessToken(payload: AccessTokenPayload): string {
        const accessSecret = jwtConfig.accessToken.secret
        if (!accessSecret) {
            throw new AppError(authMessages.error.ACCESS_TOKEN_SECRET_NOT_FOUND, statusCode.NOT_FOUND)
        }
        return jwt.sign(payload, accessSecret, {
            expiresIn: "15m",
        });
    }

    generateRefreshToken(payload: RefreshTokenPayload): string {
        const refreshSecret = jwtConfig.refreshToken.secret
        if (!refreshSecret) {
            throw new AppError(authMessages.error.REFRESH_TOKEN_SECRET_NOT_FOUND, statusCode.NOT_FOUND)
        }
        return jwt.sign(payload, refreshSecret, {
            expiresIn: "7d",
        });
    }

    generateCsrfToken(): string {
        return crypto.randomBytes(32).toString("hex");
    }

    verifyRefreshToken(token: string): RefreshTokenPayload {
        const refreshSecret = jwtConfig.refreshToken.secret;
        if (!refreshSecret) {
            throw new AppError(authMessages.error.REFRESH_TOKEN_NOT_FOUND, statusCode.NOT_FOUND)
        }
        return jwt.verify(token, refreshSecret) as RefreshTokenPayload
    }

    verifyAccessToken(token: string): AccessTokenPayload {
        const accessSecret = jwtConfig.accessToken.secret;
        if (!accessSecret) {
            throw new AppError(authMessages.error.ACCESS_TOKEN_SECRET_NOT_FOUND, statusCode.NOT_FOUND)
        }
        return jwt.verify(token, accessSecret) as AccessTokenPayload
    }

    generateResetTokenForForgotPassword(email: string): string {
        const resetTokenSecret = jwtConfig.resetTokenForForgotPassword.secret;
        if (!resetTokenSecret) {
            throw new AppError(authMessages.error.RESET_TOKEN_SECRET_NOT_FOUND, statusCode.NOT_FOUND)
        }
        return jwt.sign({
            email,
            purpose: 'password-reset'
        },
            resetTokenSecret,
            { expiresIn: "10m" }
        );
    }

    verifyResetTokenForForgotPassword(token: string): ResetTokenPayload {
        try {
            const resetTokenSecret = jwtConfig.resetTokenForForgotPassword.secret;

        if (!resetTokenSecret) {
            throw new AppError(authMessages.error.RESET_TOKEN_SECRET_NOT_FOUND, statusCode.NOT_FOUND)
        }

        const decoded = jwt.verify(token, resetTokenSecret) as ResetTokenPayload;

        if(decoded.purpose !=='password-reset'){
            throw new AppError(authMessages.error.INVALID_TOKEN_PURPOSE, statusCode.BAD_REQUEST);
        }

        return decoded
        } catch {
            throw new AppError(
                authMessages.error.INVALID_OR_EXPIRED_TOKEN,
                statusCode.FORBIDDEN
            );
        }
        
    }
}
