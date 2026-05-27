import "../config/env";
import { connectDB } from "../infrastructure/config/mongo.config";
import "../infrastructure/queues/documentProcessing.worker"
import { logError, logger } from "../infrastructure/services/log/logger"

// logger.info("Document processing worker started")

const startWorker = async () => {

    try {

        await connectDB();

        logger.info(
            "Document processing worker started"
        );

    } catch (error) {

        logError(
            error,
            "Failed to start document worker"
        );

        process.exit(1);
    }
};

startWorker();
