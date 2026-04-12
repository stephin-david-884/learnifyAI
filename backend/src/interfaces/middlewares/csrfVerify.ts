import { NextFunction, Request, Response } from "express";
import { AppError } from "../../domain/errors/AppError";
import { authMessages } from "../../application/constants/messages/authMessages";
import { statusCode } from "../../application/constants/enums/statusCode";

export const verifyCsrf = (req: Request, res: Response, next: NextFunction) => {
    const csrfCookie = req.cookies["XSRF-TOKEN"]
    const csrfHeaderRaw = req.headers["x-csrf-token"];
    const csrfHeader = Array.isArray(csrfHeaderRaw)
          ? csrfHeaderRaw[0]
          : csrfHeaderRaw;

    if(!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader){
        throw new AppError(authMessages.error.INVALID_CSRF_TOKEN, statusCode.FORBIDDEN)
    }

    console.log("CSRF PASSED");
    next()
}