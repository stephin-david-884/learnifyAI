import mongoose from "mongoose";
import { logger } from "../services/log/logger";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        logger.info("MongoDB connected");
    } catch (error) {
        const message =
        error instanceof Error ? error.message : "Unknown error";

        logger.error(`Database connection failed: ${message}`);
        process.exit(1);
    }
};