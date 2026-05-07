import { UserSubscription } from "../../../../domain/entities/UserSubscription.entity";
import { ConsumeCreditsDTO } from "../../../dtos/subscription/credits.subscription.dto";

export interface ICreditService {
    hasEnoughCredits( subscription: UserSubscription, amount: number): boolean;

    consumeCredits( data: ConsumeCreditsDTO ): Promise<UserSubscription>;

    resetCredits( subscription: UserSubscription ): Promise<UserSubscription>;

    shouldResetCredits( subscription: UserSubscription ): boolean;
}