export interface AccessTokenPayload {
    userId: string;
    email: string;
}

export interface RefreshTokenPayload {
    userId: string;
}

export interface ITokenService {
    generateAccessToken(payload: AccessTokenPayload): string;
    generateRefreshToken(payload: RefreshTokenPayload): string;
    generateCsrfToken(): string;
    verifyRefreshToken(token: string): RefreshTokenPayload;
    verifyAccessToken(token: string): AccessTokenPayload;
}