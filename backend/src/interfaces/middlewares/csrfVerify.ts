import { NextFunction, Request, Response } from "express";
import { AppError } from "../../domain/errors/AppError";
import { authMessages } from "../../application/constants/messages/authMessages";
import { statusCode } from "../../application/constants/enums/statusCode";
import { CSRF_COOKIE_NAME } from "../../config/cookie.config";

const CSRF_HEADER = "x-csrf-token";

function verifyCsrfWithCookie(req: Request, cookieName: string): void {
    const csrfCookie = req.cookies[cookieName];
    const csrfHeaderRaw = req.headers[CSRF_HEADER];
    const csrfHeader = Array.isArray(csrfHeaderRaw)
        ? csrfHeaderRaw[0]
        : csrfHeaderRaw;

    if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
        throw new AppError(
            authMessages.error.INVALID_CSRF_TOKEN,
            statusCode.FORBIDDEN,
        );
    }
}

export const verifyCsrf = (req: Request, _res: Response, next: NextFunction) => {
  verifyCsrfWithCookie(req, CSRF_COOKIE_NAME);
  next();
};
