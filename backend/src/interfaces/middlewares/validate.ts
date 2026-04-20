import { Request, Response, NextFunction } from "express";
import z, { ZodSchema } from "zod";
import { AppError } from "../../domain/errors/AppError";
import { statusCode } from "../../application/constants/enums/statusCode";

type RequestProperty = "body" | "query" | "params";

export const validate = 
    <T extends ZodSchema>(schema: T, property: RequestProperty) =>
    (
        req: Request,
        res: Response,
        next: NextFunction
    ):asserts req is Request & {
        [K in typeof property]: z.infer<T>
    } => {
        const result = schema.safeParse(req[property]);

        if(!result.success) {
            const message = result.error.issues[0]?.message || "Invalid request";
            return next(new AppError(message, statusCode.BAD_REQUEST));
        }
        req[property] = result.data;
        next();
    }