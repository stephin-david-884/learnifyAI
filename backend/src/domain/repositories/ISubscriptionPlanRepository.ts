import { SubscriptionPlan } from "../entities/SubscriptionPlan.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface ISubscriptionPlanRepository extends IBaseRepository<SubscriptionPlan> {
    findActivePlans(): Promise<SubscriptionPlan[]>;

    findByNameAndVersion(
        name: string,
        version: number
    ): Promise<SubscriptionPlan | null>;

    findLatestVersionByName(name: string): Promise<SubscriptionPlan | null>;
}