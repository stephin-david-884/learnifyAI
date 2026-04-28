export type TokenType = "USER" | "ADMIN";

export interface RefreshTokenInputDTO{
    token: string
}

export interface RefreshTokenOutputDTO {
    userId: string
    type: TokenType
    refreshToken: string
    accessToken: string
    csrfToken: string
}