import { SubscriptionPlan } from "../../../../domain/entities/SubscriptionPlan.entity";
import { UpdateSubscriptionPlanDTO } from "../../../dtos/subscription/update-subscription-plan.dto";

export interface IUpdateSubscriptionPlanUseCase {
    execute(data: UpdateSubscriptionPlanDTO): Promise<SubscriptionPlan>
}