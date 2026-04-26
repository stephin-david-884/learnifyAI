export interface AccessTokenPayload {
    userId: string;
    email: string;
}

export interface RefreshTokenPayload {
    userId: string;
}

export interface ResetTokenPayload {
    email: string
    purpose: string
}

export interface ITokenService {
    generateAccessToken(payload: AccessTokenPayload): string;
    generateRefreshToken(payload: RefreshTokenPayload): string;
    generateCsrfToken(): string;
    verifyRefreshToken(token: string): RefreshTokenPayload;
    verifyAccessToken(token: string): AccessTokenPayload;
    generateResetTokenForForgotPassword(email: string): string;
    verifyResetTokenForForgotPassword(token: string): ResetTokenPayload;
}