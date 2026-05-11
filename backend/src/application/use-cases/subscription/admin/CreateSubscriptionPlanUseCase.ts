import { SubscriptionPlan } from "../../../../domain/entities/SubscriptionPlan.entity";
import { AppError } from "../../../../domain/errors/AppError";
import { ISubscriptionPlanRepository } from "../../../../domain/repositories/ISubscriptionPlanRepository";
import { statusCode } from "../../../constants/enums/statusCode";
import { subMessages } from "../../../constants/messages/subMessags";
import { CreateSubscriptionPlanDTO } from "../../../dtos/subscription/create-subscription-plan.dto";
import { ICreateSubscriptionPlanUseCase } from "../../../interfaces/usecases/subscription/ICreateSubscriptionPlanUseCase";

export class CreateSubscriptionPlanUseCase implements ICreateSubscriptionPlanUseCase {

    constructor(
        private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository
    ) { }

    async execute(data: CreateSubscriptionPlanDTO): Promise<SubscriptionPlan> {

        const existingActivePlans = await this._subscriptionPlanRepository
            .findActivePlansByName(data.name);

        if (existingActivePlans.length > 0) {
            throw new AppError(subMessages.error.SUBSCRIPTION_PLAN_ALREADY_EXISTS, statusCode.BAD_REQUEST);
        }

        const plan = new SubscriptionPlan({
            name: data.name,
            price: data.price,
            creditsPerMonth: data.creditsPerMonth,
            discount: data.discount,
            features: data.features,
            billingCycle: data.billingCycle,
            durationInDays: data.durationInDays,
            creditResetIntervalInDays: data.creditResetIntervalInDays,
            version: 1,
            isActive: true,
        });

        return await this._subscriptionPlanRepository.save(plan);
    }
}