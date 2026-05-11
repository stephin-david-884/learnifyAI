import { SubscriptionPlan } from "../../../../domain/entities/SubscriptionPlan.entity";
import { DeactivateSubscriptionPlanDTO } from "../../../dtos/subscription/deactivate-subscription-plan.dto";

export interface IDeactivateSubscriptionPlanUseCase {

    execute( data: DeactivateSubscriptionPlanDTO ): Promise<SubscriptionPlan>;
}