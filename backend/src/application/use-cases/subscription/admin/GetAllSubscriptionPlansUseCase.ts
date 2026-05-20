import { SubscriptionPlan } from "../../../../domain/entities/SubscriptionPlan.entity";
import { ISubscriptionPlanRepository } from "../../../../domain/repositories/ISubscriptionPlanRepository";
import { PaginatedResponseDTO } from "../../../dtos/common/paginated-response.dto";
import { GetAllSubscriptionPlansDTO } from "../../../dtos/subscription/get-all-subscription-plans.dto";
import { IGetAllSubscriptionPlansUseCase } from "../../../interfaces/usecases/subscription/IGetAllSubscriptionPlansUseCase";

export class GetAllSubscriptionPlansUseCase implements IGetAllSubscriptionPlansUseCase {

    constructor(
        private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository
    ) { }

    async execute(query: GetAllSubscriptionPlansDTO): Promise<PaginatedResponseDTO<SubscriptionPlan>> {
        
        return await this._subscriptionPlanRepository.getAdminPlans(query);
    }
}