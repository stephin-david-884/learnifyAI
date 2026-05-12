import cron from "node-cron";
import { logError, logger } from "../services/log/logger";
import { resetSubscriptionCreditsUseCase, syncExpiredSubscriptionsUseCase } from "../di/subscription.container";


export const initializeSubscriptionJobs = () => {

    cron.schedule("0 * * * *", async () => {
        try {
            logger.info("Running expired subscription sync job");

            await syncExpiredSubscriptionsUseCase.execute();
        } catch (error) {
            logError(error, "Failed expired subscription sync job")
        }
    })

    cron.schedule("15 * * * *", async () => {

        try {

            logger.info(
                "Running subscription credit reset job"
            );

            await resetSubscriptionCreditsUseCase.execute();

        } catch (error) {

            logError(
                error,
                "Failed subscription credit reset job"
            );
        }
    });
}