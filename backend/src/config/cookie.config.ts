import { env } from "./env";

type SameSite = "strict" | "lax" | "none";

const isProduction = env.NODE_ENV === "production";

const sameSite = (isProduction ? "lax" : "lax") as SameSite;

export const CSRF_COOKIE_NAME = "XSRF-TOKEN";

export const USER_SESSION_COOKIE_PATH = "/api/user" as const;
export const ADMIN_SESSION_COOKIE_PATH = "/api/admin" as const;

const baseHttpOnly = {
  httpOnly: true,
  secure: isProduction,
  sameSite,
} as const;

const csrfCookieBase = {
  httpOnly: false,
  secure: isProduction,
  sameSite,
  path: "/",
  ...(isProduction && {
        domain: ".learnifyai.online",
    }),
};

export const userCookieConfig = {
  accessToken: {
    ...baseHttpOnly,
    maxAge: env.ACCESS_TOKEN_MAX_AGE,
    path: USER_SESSION_COOKIE_PATH,
  },
  refreshToken: {
    ...baseHttpOnly,
    maxAge: env.REFRESH_TOKEN_MAX_AGE,
    path: USER_SESSION_COOKIE_PATH,
  },
  csrfToken: csrfCookieBase,
};

export const adminCookieConfig = {
  accessToken: {
    ...baseHttpOnly,
    maxAge: env.ACCESS_TOKEN_MAX_AGE,
    path: ADMIN_SESSION_COOKIE_PATH,
  },
  refreshToken: {
    ...baseHttpOnly,
    maxAge: env.REFRESH_TOKEN_MAX_AGE,
    path: ADMIN_SESSION_COOKIE_PATH,
  },
  csrfToken: csrfCookieBase,
};
