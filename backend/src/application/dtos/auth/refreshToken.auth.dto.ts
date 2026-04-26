
export interface RefreshTokenInputDTO{
    token: string
}

export interface RefreshTokenOutputDTO {
    userId: string
    refreshToken: string
    accessToken: string
    csrfToken: string
}