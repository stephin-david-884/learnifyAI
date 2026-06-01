import { statusCode } from "../../../application/constants/enums/statusCode";
import { FREE_SUBSCRIPTION } from "../../../application/constants/enums/subscription.constants";
import { subMessages } from "../../../application/constants/messages/subMessags";
import { CreateSubscriptionDTO } from "../../../application/dtos/subscription/subscription.dto";
import { ISubscriptionService } from "../../../application/interfaces/services/subscription/ISubscriptionService";
import { BillingCycle } from "../../../domain/entities/SubscriptionPlan.entity";
import { UserSubscription } from "../../../domain/entities/UserSubscription.entity";
import { AppError } from "../../../domain/errors/AppError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IUserSubscriptionRepository } from "../../../domain/repositories/IUserSubscriptionRepository";

export class SubscriptionService implements ISubscriptionService {

    constructor(
        private readonly _userSubscriptionRepository: IUserSubscriptionRepository,
        private readonly _userRepository: IUserRepository
    ) { }

    async createSubscription(data: CreateSubscriptionDTO): Promise<UserSubscription> {

        const existingSubscription = await this._userSubscriptionRepository.findActiveByUserId(data.userId);

        // this.validateNewSubscriptionActivation(existingSubscription);
        await this.handleSubscriptionReplacement(existingSubscription, data.plan.billingCycle);

        const now = new Date();
        const endDate = new Date(
            now.getTime() +
            data.plan.durationInDays * 24 * 60 * 60 * 1000
        );

        const subscription = new UserSubscription({
            userId: data.userId,
            planId: data.plan.getId(),
            planVersion: data.plan.version,

            planSnapshot: {
                name: data.plan.name,
                price: data.plan.price,
                creditsPerMonth: data.plan.creditsPerMonth,
                features: data.plan.features,

                billingCycle: data.plan.billingCycle,
                durationInDays: data.plan.durationInDays,
                creditResetIntervalInDays: data.plan.creditResetIntervalInDays,
            },

            startDate: now,
            endDate,

            status: "ACTIVE",

            creditsRemaining: data.plan.creditsPerMonth,
            creditsTotal: data.plan.creditsPerMonth,

            lastCreditReset: now,
            paymentId: data.paymentId
        });

        const savedSubscription = await this._userSubscriptionRepository.save(subscription);

        await this.updateUserCachedSubscriptionState(data.userId, data.plan.name, data.plan.creditsPerMonth);

        return savedSubscription;
    }

    async getActiveSubscription(userId: string): Promise<UserSubscription | null> {
        
        const subscription = await this._userSubscriptionRepository.findActiveByUserId(userId);

        if(!subscription) {
            return null;
        }

        return await this.refreshSubscription(subscription);
    }

    async refreshSubscription(subscription: UserSubscription): Promise<UserSubscription> {
        
        const previousStatus = subscription.status;

        const previousCredits = subscription.creditsRemaining;

        subscription.refreshState();

        if( previousStatus !== subscription.status && 
            subscription.status === "EXPIRED"
        ) {
            return await this.expireSubscription(subscription);
        }

        //Reset credits
        if( previousCredits !== subscription.creditsRemaining) {
            const updated = await this._userSubscriptionRepository.save(subscription);

            await this.updateUserCachedSubscriptionState(
                subscription.userId,
                subscription.planSnapshot.name,
                subscription.creditsRemaining
            );

            return updated;
        }

        return subscription;
    }

    async expireSubscription(subscription: UserSubscription): Promise<UserSubscription> {
        
        subscription.markExpired();

        const updated = await this._userSubscriptionRepository.save(subscription);

        await this.updateUserCachedSubscriptionState(
            subscription.userId,
            FREE_SUBSCRIPTION.PLAN_NAME,
            FREE_SUBSCRIPTION.CREDITS
        );

        return updated;
    }

    // validateNewSubscriptionActivation(existingSubscription: UserSubscription | null): void {

    //     if (existingSubscription && existingSubscription.status === "ACTIVE") {
    //         throw new AppError(subMessages.error.ACTIVE_SUBSCRIPTION_ALREADY_EXISTS, statusCode.BAD_REQUEST);
    //     }
    // }

    async syncUserSubscriptionState(userId: string): Promise<void> {
        
        const subscription = await this.getActiveSubscription(userId);

        if(!subscription) {
            await this.updateUserCachedSubscriptionState(
                userId,
                FREE_SUBSCRIPTION.PLAN_NAME,
                FREE_SUBSCRIPTION.CREDITS
            );

            return;
        }

        await this.updateUserCachedSubscriptionState(
            userId,
            subscription.planSnapshot.name,
            subscription.creditsRemaining
        );
    }

    private async updateUserCachedSubscriptionState( userId: string, planName: string, credits: number): Promise<void> {
        
        const user = await this._userRepository.findById(userId);

        if(!user) {
            throw new AppError(subMessages.error.USER_NOT_FOUND, statusCode.NOT_FOUND);
        }

        user.subscriptionPlan = planName;
        user.credits = credits;

        await this._userRepository.save(user);
    }

    private async handleSubscriptionReplacement(
        existingSubscription: UserSubscription | null,
        newBillingCycle: BillingCycle
     ): Promise<void> {

        if(!existingSubscription) { 
            return;
        }

        const currentCycle = existingSubscription.planSnapshot.billingCycle;

        if(currentCycle === "MONTHLY" &&
            newBillingCycle === "YEARLY"
        ) {
            await this._userSubscriptionRepository.cancelActiveSubscription(
                existingSubscription.userId
            );

            return;
        }

        throw new AppError(subMessages.error.ACTIVE_SUBSCRIPTION_ALREADY_EXISTS, statusCode.BAD_REQUEST);

     }
}