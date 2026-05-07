import { UserSubscription } from "../../../../domain/entities/UserSubscription.entity";
import { CreateSubscriptionDTO } from "../../../dtos/subscription/subscription.dto";

export interface ISubscriptionService {
    createSubscription( data: CreateSubscriptionDTO ): Promise<UserSubscription>;

    expireSubscription( subscription: UserSubscription): Promise<UserSubscription>;

    refreshSubscription( subscription: UserSubscription): Promise<UserSubscription>;

    canActivateNewSubscription( existingSubscription: UserSubscription | null): boolean;
}