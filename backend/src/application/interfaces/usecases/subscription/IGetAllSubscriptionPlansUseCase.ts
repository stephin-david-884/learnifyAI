import { SubscriptionPlan } from "../../../../domain/entities/SubscriptionPlan.entity";
import { PaginatedResponseDTO } from "../../../dtos/common/paginated-response.dto";
import { GetAllSubscriptionPlansDTO } from "../../../dtos/subscription/get-all-subscription-plans.dto";

export interface IGetAllSubscriptionPlansUseCase {
    execute(query: GetAllSubscriptionPlansDTO): Promise<PaginatedResponseDTO<SubscriptionPlan>>;
}