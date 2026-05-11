import { IUserSubscriptionRepository } from "../../../../domain/repositories/IUserSubscriptionRepository";
import { logError } from "../../../../infrastructure/services/log/logger";
import { ISubscriptionService } from "../../../interfaces/services/subscription/ISubscriptionService";
import { ISyncExpiredSubscriptionsUseCase } from "../../../interfaces/usecases/subscription/ISyncExpiredSubscriptionsUseCase";

export class SyncExpiredSubscriptionsUseCase implements ISyncExpiredSubscriptionsUseCase {

    constructor(
        private readonly _userSubscriptionRepository: IUserSubscriptionRepository,
        private readonly _subscriptionService: ISubscriptionService
    ) { }

    async execute(): Promise<number> {
        
        const now = new Date();

        const subscriptions = await this._userSubscriptionRepository
            .findExpiringSubscriptions(now);

        let processedCount = 0;
        
        for(const subscription of subscriptions) {
            try {
                
                if(subscription.status !== "ACTIVE") {
                    continue;
                }

                if(!subscription.isExpired()) {
                    continue;
                }

                await this._subscriptionService.expireSubscription(subscription);

                processedCount++;
            } catch (error) {
                logError(error, `Failed to expire subscription: ${subscription.id}`)
            }
        }

        return processedCount;
    }
}