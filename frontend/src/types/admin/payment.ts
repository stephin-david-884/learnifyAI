import type { BillingCycle, PlanFeatures } from "../subscription";

export type PaymentStatus = | "CREATED" | "SUCCESS" | "FAILED";

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
    createdAt: string;
    updatedAt: string;
}

export interface GetAdminPaymentsQuery {
    page?: number;
    limit?: number;
    search?: string;
    status?: PaymentStatus | "";
    sortBy?: | "createdAt" | "amount";
    sortOrder?: | "asc" | "desc";
}

export interface PaginatedPaymentsResponse {
    items: Payment[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}