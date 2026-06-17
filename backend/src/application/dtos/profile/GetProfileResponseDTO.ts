import { BillingCycle } from "../../../domain/entities/SubscriptionPlan.entity";
import { SubscriptionStatus } from "../../../domain/entities/UserSubscription.entity";

export interface GetProfileResponseDTO {
    id: string;
    name: string;
    email: string;
    profileImage?: string;

    accountType: "GOOGLE" | "EMAIL";

    subscription: {
        planName: string;
        status: SubscriptionStatus;
        billingCycle: BillingCycle;
        creditsRemaining: number;
        creditsTotal: number;
        startDate: Date;
        endDate: Date;
    } | null;
}