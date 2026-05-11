import { BillingCycle, PlanFeatures } from "../../../domain/entities/SubscriptionPlan.entity";

export interface CreateSubscriptionPlanDTO {
    name: string;
    price: number;
    creditsPerMonth: number;
    discount?: number;
    features: PlanFeatures;
    billingCycle: BillingCycle;
    durationInDays: number;
    creditResetIntervalInDays: number;
}