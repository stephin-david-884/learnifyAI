export interface LoginAdminInputDTO {
    email: string,
    password: string
}

export interface LoginAdminOutputDTO {
    accessToken: string
    refreshToken: string
    csrfToken: string
    admin: {
        id: string
        email: string
        name: string
    }
}