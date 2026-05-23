import { SubscriptionPlan } from "../../../../domain/entities/SubscriptionPlan.entity";
import { PaginatedResponseDTO } from "../../../dtos/common/paginated-response.dto";
import { GetAvailablePlansDTO } from "../../../dtos/subscription/get-available-plans.dto";

export interface IGetAvailablePlansUseCase {
    execute(query: GetAvailablePlansDTO): Promise<PaginatedResponseDTO<SubscriptionPlan>>;
}