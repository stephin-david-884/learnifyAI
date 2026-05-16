import { SubscriptionPlan } from "../../../../domain/entities/SubscriptionPlan.entity";
import { AppError } from "../../../../domain/errors/AppError";
import { ISubscriptionPlanRepository } from "../../../../domain/repositories/ISubscriptionPlanRepository";
import { IUserSubscriptionRepository } from "../../../../domain/repositories/IUserSubscriptionRepository";
import { statusCode } from "../../../constants/enums/statusCode";
import { subMessages } from "../../../constants/messages/subMessags";
import { UpdateSubscriptionPlanDTO } from "../../../dtos/subscription/update-subscription-plan.dto";
import { IUpdateSubscriptionPlanUseCase } from "../../../interfaces/usecases/subscription/IUpdateSubscriptionPlanUseCase";

export class UpdateSubscriptionPlanUseCase implements IUpdateSubscriptionPlanUseCase {

    constructor(
        private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
        private readonly _userSubscriptionRepository: IUserSubscriptionRepository
    ) {}

    async execute(data: UpdateSubscriptionPlanDTO): Promise<SubscriptionPlan> {
        
        const latestPlan = await this._subscriptionPlanRepository
                            .findLatestVersionByName(data.name);

        if(!latestPlan) {
            throw new AppError(subMessages.error.PLAN_NOT_FOUND, statusCode.NOT_FOUND);
        }

        const hasSubscribers = await this._userSubscriptionRepository.existsByPlan(latestPlan.id!, latestPlan.version);

        if(!hasSubscribers) {
            latestPlan.price = data.price;
            latestPlan.creditsPerMonth = data.creditsPerMonth;
            latestPlan.discount = data.discount? data.discount : 0;
            latestPlan.features = data.features;
            latestPlan.billingCycle = data.billingCycle;
            latestPlan.durationInDays = data.durationInDays;
            latestPlan.creditResetIntervalInDays = data.creditResetIntervalInDays;

            return await this._subscriptionPlanRepository.save(latestPlan);
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