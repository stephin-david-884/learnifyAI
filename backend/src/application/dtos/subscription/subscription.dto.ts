import { SubscriptionPlan } from "../../../domain/entities/SubscriptionPlan.entity";

export interface CreateSubscriptionDTO {
    userId: string;
    plan: SubscriptionPlan;
    paymentId?: string;
}