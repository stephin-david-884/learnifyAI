import "express";
import { Logger } from "pino";
import { AccessTokenPayload } from "../application/interfaces/services/ITokenService";

declare module "express-serve-static-core" {
  interface Request {
    log: Logger;
    user?: AccessTokenPayload
  }
}