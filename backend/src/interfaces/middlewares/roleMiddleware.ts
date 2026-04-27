import { Request, Response, NextFunction } from "express";
import { AppError } from "../../domain/errors/AppError";
import { statusCode } from "../../application/constants/enums/statusCode";

export const requireRole = (role: "USER" | "ADMIN") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || user.type !== role) {
      return next(new AppError("Forbidden", statusCode.FORBIDDEN));
    }

    next();
  };
};