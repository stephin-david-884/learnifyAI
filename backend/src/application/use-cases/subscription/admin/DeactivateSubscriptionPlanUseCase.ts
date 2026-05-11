import { SubscriptionPlan } from "../../../../domain/entities/SubscriptionPlan.entity";
import { AppError } from "../../../../domain/errors/AppError";
import { ISubscriptionPlanRepository } from "../../../../domain/repositories/ISubscriptionPlanRepository";
import { statusCode } from "../../../constants/enums/statusCode";
import { subMessages } from "../../../constants/messages/subMessags";
import { DeactivateSubscriptionPlanDTO } from "../../../dtos/subscription/deactivate-subscription-plan.dto";
import { IDeactivateSubscriptionPlanUseCase } from "../../../interfaces/usecases/subscription/IDeactivateSubscriptionPlanUseCase";

export class DeactivateSubscriptionPlanUseCase implements IDeactivateSubscriptionPlanUseCase {

    constructor(
        private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository
    ) { }

    async execute(data: DeactivateSubscriptionPlanDTO): Promise<SubscriptionPlan> {

        const plan = await this._subscriptionPlanRepository.findById(data.planId);

        if (!plan) {
            throw new AppError(subMessages.error.PLAN_NOT_FOUND, statusCode.NOT_FOUND);
        }

        if (!plan.isActive) {
            throw new AppError(subMessages.error.SUBSCRIPTION_PLAN_ALREADY_DEACTIVATED, statusCode.BAD_REQUEST);
        }

        const activePlans = await this._subscriptionPlanRepository
            .findActivePlans();

        if (activePlans.length <= 1) {
            throw new AppError(subMessages.error.CANNOT_DEACTIVATE_LAST_ACTIVE_PLAN, statusCode.BAD_REQUEST);
        }

        plan.deactivate();

        return await this._subscriptionPlanRepository
            .save(plan);
    }
}