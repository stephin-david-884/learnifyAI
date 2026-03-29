import pino from "pino";
import fs from "fs";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

// Ensure logs directory exists
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Log file path
const logFile = path.join(logDir, "app.log");
const fileStream = fs.createWriteStream(logFile, { flags: "a" });

// Logger instance
export const logger = pino(
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