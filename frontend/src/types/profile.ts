import type { BillingCycle, SubscriptionStatus } from "./subscription";

export interface UserProfile {
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

export interface UpdateProfilePayload {
    name: string;
}

export interface UpdateProfileResponse {
    id: string;
    name: string;
    email: string;
}

export interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
}

export interface ProfileState {
    profile: UserProfile | null;
    loading: boolean;
    updatingProfile: boolean;
    changingPassword: boolean;
    cancellingSubscription: boolean;
    error: string | null;
}