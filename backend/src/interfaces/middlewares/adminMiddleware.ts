import { Request, Response, NextFunction } from "express";

import { ITokenService } from "../../application/interfaces/services/ITokenService";

import { AppError } from "../../domain/errors/AppError";

import { statusCode } from "../../application/constants/enums/statusCode";

export const adminMiddleware = (
    tokenService: ITokenService
) => {

    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const token = req.cookies.accessToken;

        if (!token) {
            return next(
                new AppError(
                    "Unauthorized",
                    statusCode.UNAUTHORIZED
                )
            );
        }

        try {

            const payload =
                tokenService.verifyAccessToken(token);

            if (payload.type !== "ADMIN") {

                return next(
                    new AppError(
                        "Forbidden",
                        statusCode.FORBIDDEN
                    )
                );
            }

            req.user = payload;

            next();

        } catch {

            return next(
                new AppError(
                    "Unauthorized",
                    statusCode.UNAUTHORIZED
                )
            );
        }
    };
};