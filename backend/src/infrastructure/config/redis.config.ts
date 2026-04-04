import Redis from "ioredis";
import { logger } from "../services/log/logger";

export const redisClient = new Redis(process.env.REDIS_URL as string);

redisClient.on("connect", () => {
  logger.info('Redis connected')
});

redisClient.on("error", (err) => {
  logger.error(`Redis error: ${err.message}`)
});