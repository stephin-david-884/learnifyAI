import { UserSubscription } from "../entities/UserSubscription.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IUserSubscriptionRepository extends IBaseRepository<UserSubscription> {

    findActiveByUserId(userId: string): Promise<UserSubscription | null>;

    findByUserId(userId: string): Promise<UserSubscription[]>;

    findExpiringSubscriptions(date: Date): Promise<UserSubscription[]>;

    findSubscriptionsNeedingCreditReset(): Promise<UserSubscription[]>;
}