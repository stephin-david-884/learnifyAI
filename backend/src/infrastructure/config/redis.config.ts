import Redis from "ioredis";
import { logError, logger } from "../services/log/logger";

export const redisClient = new Redis(process.env.REDIS_URL as string);

redisClient.on("connect", () => {
  logger.info('Redis connected')
});

redisClient.on("error", (err) => {
  logError(err, "Redis connection error")
});