import type { Payment } from "./admin/payment";

export type BillingCycle = | "MONTHLY" | "YEARLY";

export type PlanFeatures = {
    maxDocuments: number;
    interviewAccess: boolean;
};

export interface SubscriptionPlan {
    id: string;

    name: string;

    price: number;

    creditsPerMonth: number;

    discount?: number;

    features: PlanFeatures;

    billingCycle: BillingCycle;

    durationInDays: number;

    creditResetIntervalInDays: number;

    version: number;

    isActive: boolean;

    createdAt?: string;
    updatedAt?: string;
}

export type SubscriptionStatus =
    | "ACTIVE"
    | "EXPIRED"
    | "CANCELLED";

export interface UserSubscription {
    id: string;

    userId: string;

    planId: string;

    planVersion: number;

    planSnapshot: {
        name: string;
        price: number;
        creditsPerMonth: number;
        features: PlanFeatures;
        billingCycle: BillingCycle;
        durationInDays: number;
        creditResetIntervalInDays: number;
    };

    startDate: string;

    endDate: string;

    status: SubscriptionStatus;

    creditsRemaining: number;

    creditsTotal: number;

    lastCreditReset: string;

    paymentId?: string;

    createdAt?: string;
    updatedAt?: string;
}

export interface CreditStatus {
    subscriptionStatus: SubscriptionStatus;

    creditsRemaining: number;

    creditsTotal: number;

    planName: string;

    nextResetDate: string | null;
}

export interface CreatePaymentOrderResponse {
    paymentId: string;

    orderId: string;

    amount: number;

    currency: string;

    key: string;

    planName: string;
}

export interface SubscriptionState {
    plans: SubscriptionPlan[];

    total: number;

    page: number;

    limit: number;

    totalPages: number;

    activeSubscription: UserSubscription | null;

    payments: Payment[];

    creditStatus: CreditStatus | null;

    paymentOrder: CreatePaymentOrderResponse | null;

    loading: boolean;

    error: string | null;
}

export interface CreateSubscriptionPlanPayload {
    name: string;

    price: number;

    creditsPerMonth: number;

    discount?: number;

    features: {
        maxDocuments: number;
        interviewAccess: boolean;
    };

    billingCycle: BillingCycle;

    durationInDays: number;

    creditResetIntervalInDays: number;
}

export type UpdateSubscriptionPlanPayload =
    CreateSubscriptionPlanPayload;

export interface AdminSubscriptionState {
    plans: SubscriptionPlan[];
    payments: Payment[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

export interface GetSubscriptionPlansQuery {
    page?: number;
    limit?: number;
    search?: string;
    billingCycle?: BillingCycle | "";
    isActive?: boolean | "";
}

export interface PaginatedSubscriptionPlansResponse {
    items: SubscriptionPlan[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface GetAvailablePlansQuery {
    page?: number;
    limit?: number;
}

export interface MarkPaymentFailedPayload {
    razorpayOrderId: string;
}