import { UserSubscription } from "../../../domain/entities/UserSubscription.entity";

export interface ConsumeCreditsDTO {
    subscription: UserSubscription;
    amount: number;
}