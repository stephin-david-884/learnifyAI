export type BillingCycle = "MONTHLY" | "YEARLY";

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

export type PaymentStatus =
    | "CREATED"
    | "SUCCESS"
    | "FAILED";

export interface Payment {
    id: string;

    userId: string;

    planId: string;

    planSnapshot: {
        name: string;
        price: number;
        creditsPerMonth: number;
        features: PlanFeatures;
        billingCycle: BillingCycle;
        durationInDays: number;
        creditResetIntervalInDays: number;
    };

    razorpayOrderId: string;

    razorpayPaymentId?: string;

    razorpaySignature?: string;

    amount: number;

    status: PaymentStatus;

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

    activeSubscription: UserSubscription | null;

    payments: Payment[];

    creditStatus: CreditStatus | null;

    paymentOrder: CreatePaymentOrderResponse | null;

    loading: boolean;

    error: string | null;
}