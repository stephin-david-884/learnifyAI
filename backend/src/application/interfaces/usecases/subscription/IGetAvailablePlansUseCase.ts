import { SubscriptionPlan } from "../../../../domain/entities/SubscriptionPlan.entity";

export interface IGetAvailablePlansUseCase {
    execute(): Promise<SubscriptionPlan[]>;
}