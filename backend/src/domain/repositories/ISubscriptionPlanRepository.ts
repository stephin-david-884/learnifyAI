import { PaginatedResponseDTO } from "../../application/dtos/common/paginated-response.dto";
import { GetAllSubscriptionPlansDTO } from "../../application/dtos/subscription/get-all-subscription-plans.dto";
import { SubscriptionPlan } from "../entities/SubscriptionPlan.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface ISubscriptionPlanRepository extends IBaseRepository<SubscriptionPlan> {
    findActivePlans(): Promise<SubscriptionPlan[]>;

    findByNameAndVersion(
        name: string,
        version: number
    ): Promise<SubscriptionPlan | null>;

    findLatestVersionByName(name: string): Promise<SubscriptionPlan | null>;

    findActivePlansByName( name: string ): Promise<SubscriptionPlan[]>;

    getAdminPlans(query: GetAllSubscriptionPlansDTO): Promise<PaginatedResponseDTO<SubscriptionPlan>>;
}