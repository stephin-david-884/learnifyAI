export interface CreditStatusDTO {

    subscriptionId: string | null;

    status: string;

    planName: string;

    creditsRemaining: number;

    creditsTotal: number;

    lastCreditReset: Date | null;

    endDate: Date | null;

    isPro: boolean;
}