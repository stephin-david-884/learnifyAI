import { UserSubscription } from "../../../../domain/entities/UserSubscription.entity";

export interface IGetActiveSubscriptionUseCase {
    execute(userId: string): Promise<UserSubscription | null>;
}