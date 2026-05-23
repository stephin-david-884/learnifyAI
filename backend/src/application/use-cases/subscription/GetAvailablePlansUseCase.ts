import { SubscriptionPlan } from "../../../domain/entities/SubscriptionPlan.entity";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
import { PaginatedResponseDTO } from "../../dtos/common/paginated-response.dto";
import { GetAvailablePlansDTO } from "../../dtos/subscription/get-available-plans.dto";
import { IGetAvailablePlansUseCase } from "../../interfaces/usecases/subscription/IGetAvailablePlansUseCase";

export class GetAvailablePlansUseCase implements IGetAvailablePlansUseCase {

    constructor(
        private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository
    ) {}

    async execute(query: GetAvailablePlansDTO): Promise<PaginatedResponseDTO<SubscriptionPlan>> {
        
        return await this._subscriptionPlanRepository.findActivePlans(query);

    }
}