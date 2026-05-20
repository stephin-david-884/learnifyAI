import { BillingCycle } from "../../../domain/entities/SubscriptionPlan.entity";

export interface GetAllSubscriptionPlansDTO {
    page: number;
    limit: number;
    search?: string;
    // status?: "ACTIVE" | "EXPIRED" | "CANCELLED";
    billingCycle?: BillingCycle;
    isActive?: boolean;
    sortBy?: "createdAt" | "price" | "name";
    sortOrder?: "asc" | "desc";
}