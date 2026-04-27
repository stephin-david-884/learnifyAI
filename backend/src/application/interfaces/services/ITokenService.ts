export type TokenType = "USER" | "ADMIN";

export interface AccessTokenPayload {
    userId: string;
    email: string;
    type: TokenType;
}

export interface RefreshTokenPayload {
    userId: string;
    type: TokenType;
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