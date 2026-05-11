import { SubscriptionPlan } from "../../../../domain/entities/SubscriptionPlan.entity";
import { AppError } from "../../../../domain/errors/AppError";
import { ISubscriptionPlanRepository } from "../../../../domain/repositories/ISubscriptionPlanRepository";
import { statusCode } from "../../../constants/enums/statusCode";
import { subMessages } from "../../../constants/messages/subMessags";
import { UpdateSubscriptionPlanDTO } from "../../../dtos/subscription/update-subscription-plan.dto";
import { IUpdateSubscriptionPlanUseCase } from "../../../interfaces/usecases/subscription/IUpdateSubscriptionPlanUseCase";

export class UpdateSubscriptionPlanUseCase implements IUpdateSubscriptionPlanUseCase {

    constructor(
        private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository
    ) {}

    async execute(data: UpdateSubscriptionPlanDTO): Promise<SubscriptionPlan> {
        
        const latestPlan = await this._subscriptionPlanRepository
                            .findLatestVersionByName(data.name);

        if(!latestPlan) {
            throw new AppError(subMessages.error.PLAN_NOT_FOUND, statusCode.NOT_FOUND);
        }
        
        //Deactivate the old version
        if(latestPlan.isActive) {
            latestPlan.deactivate();

            await this._subscriptionPlanRepository.save(latestPlan);
        }

        //create new version
        const newPlan = new SubscriptionPlan({
            name: data.name,

            price: data.price,

            creditsPerMonth: data.creditsPerMonth,

            discount: data.discount,

            features: data.features,

            billingCycle: data.billingCycle,

            durationInDays: data.durationInDays,

            creditResetIntervalInDays:
                data.creditResetIntervalInDays,

            version: latestPlan.version + 1,

            isActive: true,
        });

        return await this._subscriptionPlanRepository
            .save(newPlan);
    }
}