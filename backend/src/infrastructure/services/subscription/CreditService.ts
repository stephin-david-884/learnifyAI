import { statusCode } from "../../../application/constants/enums/statusCode";
import { subMessages } from "../../../application/constants/messages/subMessags";
import { ConsumeCreditsDTO } from "../../../application/dtos/subscription/credits.subscription.dto";
import { ICreditService } from "../../../application/interfaces/services/subscription/ICreditService";
import { ISubscriptionService } from "../../../application/interfaces/services/subscription/ISubscriptionService";
import { UserSubscription } from "../../../domain/entities/UserSubscription.entity";
import { AppError } from "../../../domain/errors/AppError";
import { IUserSubscriptionRepository } from "../../../domain/repositories/IUserSubscriptionRepository";

export class CreditService implements ICreditService {
    
    constructor(
        private readonly _userSubscriptionRepository: IUserSubscriptionRepository,
        private readonly _subscriptionService: ISubscriptionService
    ) { }

    hasEnoughCredits(subscription: UserSubscription, amount: number): boolean {
        return subscription.creditsRemaining >= amount;
    }

    async consumeCredits(data: ConsumeCreditsDTO): Promise<UserSubscription> {
        
        const refreshedSubscription = await this._subscriptionService.refreshSubscription(
            data.subscription
        );

        if(refreshedSubscription.status !== "ACTIVE") {
            throw new AppError(subMessages.error.SUBSCRIPTION_NOT_ACTIVE, statusCode.BAD_REQUEST);
        }

        if(data.amount <=0 ){
            throw new AppError(subMessages.error.INVALID_CREDIT_AMOUNT, statusCode.BAD_REQUEST);
        }

        //validate available credits
        if( !this.hasEnoughCredits(refreshedSubscription, data.amount) ) {
            throw new AppError(subMessages.error.INSUFFICIENT_CREDITS, statusCode.BAD_REQUEST);
        }

        refreshedSubscription.consumeCredits(data.amount);

        const updatedSubscription = await this._userSubscriptionRepository.save(refreshedSubscription);

        await this._subscriptionService.syncUserSubscriptionState(updatedSubscription.userId);

        return updatedSubscription;
    }

    async resetCredits(subscription: UserSubscription): Promise<UserSubscription> {
        
        subscription.resetCredits();

        const updated = await this._userSubscriptionRepository.save(subscription);

        await this._subscriptionService.syncUserSubscriptionState(updated.userId);

        return updated;
    }

    shouldResetCredits(subscription: UserSubscription): boolean {
        return subscription.shouldResetCredits();
    }

    async getValidSubscription(userId: string): Promise<UserSubscription> {
        
        const subscription = await this._subscriptionService.getActiveSubscription(userId);

        if(!subscription) {
            throw new AppError(subMessages.error.SUBSCRIPTION_NOT_ACTIVE, statusCode.NOT_FOUND);
        }

        if(subscription.status !== "ACTIVE") {
            throw new AppError(subMessages.error.SUBSCRIPTION_NOT_ACTIVE, statusCode.BAD_REQUEST);
        }

        return subscription;
    }    
}