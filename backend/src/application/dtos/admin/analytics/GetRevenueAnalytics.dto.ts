import {
    BillingCycleBreakdown,
    PlanRevenueBreakdown,
    RevenueOverview,
    RevenueTrend,
    SubscriptionStatusBreakdown,
} from "../../../../domain/repositories/IRevenueAnalyticsRepository";

export interface GetRevenueAnalyticsResponseDTO {

    overview: RevenueOverview;

    revenueTrend: RevenueTrend[];

    planBreakdown: PlanRevenueBreakdown[];

    billingCycleBreakdown: BillingCycleBreakdown[];

    statusBreakdown: SubscriptionStatusBreakdown[];

}