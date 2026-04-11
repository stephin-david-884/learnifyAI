import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AppError } from "../../domain/errors/AppError";
import { ZodError } from "zod";
import { statusCode } from "../../application/constants/enums/statusCode";
import { authMessages } from "../../application/constants/messages/authMessages";


export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  req.log.error({ error }, "Error caught in error handler");

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (error instanceof ZodError) {
    const errorMessage = error.issues[0]?.message;

    res.status(statusCode.BAD_REQUEST).json({
      success: false,
      message: errorMessage,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? authMessages.error.INTERNAL_SERVER_ERROR
        : error instanceof Error
        ? error.message
        : authMessages.error.INTERNAL_SERVER_ERROR,
  });
};