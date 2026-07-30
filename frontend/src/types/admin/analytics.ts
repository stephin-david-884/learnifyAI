export type AnalyticsPeriod =
    | "LAST_7_DAYS"
    | "LAST_30_DAYS"
    | "LAST_90_DAYS"
    | "THIS_MONTH"
    | "CUSTOM";

export interface AnalyticsFilter {

    period: AnalyticsPeriod;

    startDate?: string;

    endDate?: string;

}

export interface OverviewMetrics {

    totalRequests: number;

    successfulRequests: number;

    failedRequests: number;

    successRate: number;

}

export interface DailyAIUsage {

    date: string;

    requests: number;

}

export interface FeatureUsage {

    feature: string;

    requests: number;

}

export interface ProviderUsage {

    provider: string;

    requests: number;

}

export interface ModelUsage {

    model: string;

    requests: number;

}

export interface FailureStatistics {

    error: string;

    count: number;

}

export interface LatencyStatistics {

    averageLatencyMs: number;

    minimumLatencyMs: number;

    maximumLatencyMs: number;

}

export interface AIAnalytics {

    overview: OverviewMetrics;

    dailyUsage: DailyAIUsage[];

    featureUsage: FeatureUsage[];

    providerUsage: ProviderUsage[];

    modelUsage: ModelUsage[];

    failureStatistics: FailureStatistics[];

    estimatedCost: number;

    latencyStatistics: LatencyStatistics;

}

export interface UserOverview {

    totalUsers: number;

    freeUsers: number;

    proUsers: number;

    blockedUsers: number;

    newUsers: number;

}

export interface UserRegistrationTrend {

    date: string;

    registrations: number;

}

export interface UserAnalytics {

    overview: UserOverview;

    registrations: UserRegistrationTrend[];

}

export interface DocumentOverview {

    totalDocuments: number;

    readyDocuments: number;

    processingDocuments: number;

    failedDocuments: number;

    uploadingDocuments: number;

    totalPages: number;

    totalStorageBytes: number;

    averageFileSizeBytes: number;

}

export interface DocumentUploadTrend {

    date: string;

    uploads: number;

}

export interface DocumentStatusBreakdown {

    status: string;

    totalDocuments: number;

}

export interface DocumentMimeTypeBreakdown {

    mimeType: string;

    totalDocuments: number;

}

export interface DocumentAnalytics {

    overview: DocumentOverview;

    uploadTrend: DocumentUploadTrend[];

    statusBreakdown: DocumentStatusBreakdown[];

    mimeTypeBreakdown: DocumentMimeTypeBreakdown[];

}

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

export type BillingCycle = "MONTHLY" | "YEARLY";

export interface PlanRevenueBreakdown {

    planName: string;

    billingCycle: BillingCycle;

    subscriptions: number;

    revenue: number;

}

export interface BillingCycleBreakdown {

    billingCycle: string;

    subscriptions: number;

    revenue: number;

}

export interface SubscriptionStatusBreakdown {

    status: string;

    subscriptions: number;

}

export interface RevenueAnalytics {

    overview: RevenueOverview;

    revenueTrend: RevenueTrend[];

    planBreakdown: PlanRevenueBreakdown[];

    billingCycleBreakdown: BillingCycleBreakdown[];

    statusBreakdown: SubscriptionStatusBreakdown[];

}

export interface DashboardSummary {

    ai: AIAnalytics;

    users: UserAnalytics;

    documents: DocumentAnalytics;

    revenue: RevenueAnalytics;

}

export interface AnalyticsState {

    dashboard: DashboardSummary | null;

    ai: AIAnalytics | null;

    users: UserAnalytics | null;

    documents: DocumentAnalytics | null;

    revenue: RevenueAnalytics | null;

    loading: boolean;

    refreshing: boolean;

    error: string | null;

    filter: AnalyticsFilter;

}