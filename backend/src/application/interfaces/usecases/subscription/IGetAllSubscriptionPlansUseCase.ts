import { SubscriptionPlan } from "../../../../domain/entities/SubscriptionPlan.entity";

export interface IGetAllSubscriptionPlansUseCase {
    execute(): Promise<SubscriptionPlan[]>;
}