import { SubscriptionPlan } from "../../../../domain/entities/SubscriptionPlan.entity";
import { ISubscriptionPlanRepository } from "../../../../domain/repositories/ISubscriptionPlanRepository";
import { IGetAllSubscriptionPlansUseCase } from "../../../interfaces/usecases/subscription/IGetAllSubscriptionPlansUseCase";

export class GetAllSubscriptionPlansUseCase implements IGetAllSubscriptionPlansUseCase {

    constructor(
        private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository
    ) { }

    async execute(): Promise<SubscriptionPlan[]> {

    const plans =
        await this._subscriptionPlanRepository.findAll();

    return plans.sort((a, b) => {

        if(a.name === b.name) {
            return b.version - a.version;
        }

        return a.name.localeCompare(b.name);
    });
}
}