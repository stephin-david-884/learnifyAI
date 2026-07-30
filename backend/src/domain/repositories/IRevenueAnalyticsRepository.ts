import { AnalyticsFilterDTO } from "../../application/dtos/admin/analytics/analyticsFilter.dto";
import { BillingCycle } from "../entities/SubscriptionPlan.entity";
import { SubscriptionStatus } from "../entities/UserSubscription.entity";

export interface RevenueOverview {

    totalRevenue: number;

    totalSubscriptions: number;

    activeSubscriptions: number;

    expiredSubscriptions: number;

    cancelledSubscriptions: number;

    averageRevenuePerSubscription: number;

}

export interface RevenueTrend {

    date: string;

    revenue: number;

}

export interface PlanRevenueBreakdown {

    planName: string;

    billingCycle: BillingCycle;

    subscriptions: number;

    revenue: number;

}

export interface BillingCycleBreakdown {

    billingCycle: BillingCycle;

    subscriptions: number;

    revenue: number;

}

export interface SubscriptionStatusBreakdown {

    status: SubscriptionStatus;

    subscriptions: number;

}

export interface IRevenueAnalyticsRepository {

    getOverview(
        filter: AnalyticsFilterDTO
    ): Promise<RevenueOverview>;

    getRevenueTrend(
        filter: AnalyticsFilterDTO
    ): Promise<RevenueTrend[]>;

    getPlanBreakdown(
        filter: AnalyticsFilterDTO
    ): Promise<PlanRevenueBreakdown[]>;

    getBillingCycleBreakdown(
        filter: AnalyticsFilterDTO
    ): Promise<BillingCycleBreakdown[]>;

    getStatusBreakdown(
        filter: AnalyticsFilterDTO
    ): Promise<SubscriptionStatusBreakdown[]>;

}