import { SubscriptionPlan } from "../../../domain/entities/SubscriptionPlan.entity";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
import { IGetAvailablePlansUseCase } from "../../interfaces/usecases/subscription/IGetAvailablePlansUseCase";

export class GetAvailablePlansUseCase implements IGetAvailablePlansUseCase {

    constructor(
        private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository
    ) {}

    async execute(): Promise<SubscriptionPlan[]> {
        
        const plans = await this._subscriptionPlanRepository.findActivePlans();

        return plans.sort((a,b) => a.price - b.price);
    }
}