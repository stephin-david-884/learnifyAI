import { env } from "node:process";

export const jwtConfig = {
    accessToken: {
        secret: env.JWT_ACCESS_SECRET,
    },
    refreshToken: {
        secret: env.JWT_REFRESH_SECRET,
    },
    resetTokenForForgotPassword: {
        secret: env.RESET_TOKEN_SECRET
    }
}