import { IUserSubscriptionRepository } from "../../../../domain/repositories/IUserSubscriptionRepository";
import { logError } from "../../../../infrastructure/services/log/logger";
import { ICreditService } from "../../../interfaces/services/subscription/ICreditService";
import { IResetSubscriptionCreditsUseCase } from "../../../interfaces/usecases/subscription/IResetSubscriptionCreditsUseCase";

export class ResetSubscriptionCreditsUseCase implements IResetSubscriptionCreditsUseCase {

    constructor(
        private readonly _userSubscriptionRepository: IUserSubscriptionRepository,
        private readonly _creditService: ICreditService
    ) { }

    async execute(): Promise<number> {

        const subscriptions = await this._userSubscriptionRepository
            .findActiveSubscriptions();

        let processedCount = 0;

        for (const subscription of subscriptions) {
            try {

                const shouldReset = this._creditService.shouldResetCredits(subscription);

                if (!shouldReset) {
                    continue;
                }

                await this._creditService.resetCredits(subscription);

                processedCount++;
            } catch (error) {
                logError(
                    error,
                    `Failed to reset credits for subscription: ${subscription.id}`
                );
            }
        }

        return processedCount;
    }
}