import { env } from "./env";

type SameSite = "strict" | "lax" | "none";

const isProduction = env.NODE_ENV === "production";

export const cookieConfig = {
  accessToken: {
    httpOnly: true,
    secure: isProduction,
    sameSite: (isProduction ? "none" : "lax") as SameSite,
    maxAge: env.ACCESS_TOKEN_MAX_AGE,
    path: "/",
  },

  refreshToken: {
    httpOnly: true,
    secure: isProduction,
    sameSite: (isProduction ? "none" : "lax") as SameSite,
    maxAge: env.REFRESH_TOKEN_MAX_AGE,
    path: "/",
  },

  csrfToken: {
    httpOnly: false,
    secure: isProduction,
    sameSite: (isProduction ? "none" : "lax") as SameSite,
    path: "/",
  },
};