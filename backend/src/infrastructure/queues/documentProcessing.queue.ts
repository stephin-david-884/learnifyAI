import { Queue } from "bullmq";
import { redisClient } from "../config/redis.config";

export const documentProcessingQueue = new Queue(
    "document-processing",
    {
        connection: redisClient
    });