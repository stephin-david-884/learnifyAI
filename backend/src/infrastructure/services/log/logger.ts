import pino from "pino";
import fs from "fs";
import path from "path";
import { ILogger } from "../../../application/interfaces/services/ILogger";

const isProduction = process.env.NODE_ENV === "production";

// Ensure logs directory exists
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Log file path
const logFile = path.join(logDir, "app.log");
const fileStream = fs.createWriteStream(logFile, { flags: "a" });

// Create pino instance
export const pinoLogger = pino(
  {
    level: isProduction ? "info" : "debug",
  },
  isProduction
    ? fileStream
    : pino.transport({
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
      },
    })
);

// Wrap with your interface
class PinoLogger implements ILogger {
  info(message: string): void {
    pinoLogger.info(message);
  }

  error(message: string | Error): void {
    if (message instanceof Error) {
      pinoLogger.error({ msg: message.message, stack: message.stack });
    } else {
      pinoLogger.error(message);
    }
  }
}

// Export abstraction
export const logger: ILogger = new PinoLogger();

export function logError(error: unknown, contextMessage?: string): void {
    if (error instanceof Error) {
        if (contextMessage) {
            logger.error(`${contextMessage}: ${error.message}`);
        } else {
            logger.error(error);
        }

        //log stack in non-production
        if (process.env.NODE_ENV !== "production") {
            logger.error(error.stack || "No stack trace available");
        }
    } else {
        const message = contextMessage
            ? `${contextMessage}: ${String(error)}`
            : `Non-error thrown: ${String(error)}`;
        logger.error(message);
    }
}