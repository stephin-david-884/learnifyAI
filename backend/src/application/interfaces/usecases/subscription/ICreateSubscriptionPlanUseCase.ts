import { SubscriptionPlan } from "../../../../domain/entities/SubscriptionPlan.entity";
import { CreateSubscriptionPlanDTO } from "../../../dtos/subscription/create-subscription-plan.dto";

export interface ICreateSubscriptionPlanUseCase {
    execute(data: CreateSubscriptionPlanDTO): Promise<SubscriptionPlan>;
}